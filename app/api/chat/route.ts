import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_WEBHOOK_URL =
  "https://duk0426.app.n8n.cloud/webhook-test/be503623-e1a5-455a-97d8-b664a6e32b1f";

function getWebhookUrl() {
  return (
    process.env.N8N_WEBHOOK_URL ||
    process.env.N8N_CHAT_WEBHOOK_URL ||
    DEFAULT_WEBHOOK_URL
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      message?: unknown;
      sessionId?: unknown;
      [key: string]: unknown;
    } | null;

    const message =
      typeof body?.message === "string" ? body.message.trim() : "";
    if (!message) {
      return NextResponse.json(
        { error: "Bad Request", details: "`message` is required" },
        { status: 400 }
      );
    }

    const webhookRes = await fetch(getWebhookUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
      },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify(body ?? { message }),
    });

    const contentType = webhookRes.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await webhookRes.json().catch(() => null)
      : await webhookRes.text().catch(() => "");

    if (!webhookRes.ok) {
      const upstreamStatus = webhookRes.status || 502;
      return NextResponse.json(
        {
          error: "Upstream request failed",
          upstreamStatus,
          upstreamStatusText: webhookRes.statusText,
          details: payload || webhookRes.statusText,
        },
        { status: upstreamStatus }
      );
    }

    return NextResponse.json({ data: payload }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}
