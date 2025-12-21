export const dynamic = "force-dynamic";

function getWebhookUrl() {
  return (
    process.env.N8N_WEBHOOK_URL ??
    "https://duk0426.app.n8n.cloud/webhook-test/be503623-e1a5-455a-97d8-b664a6e32b1f"
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      message?: unknown;
      sessionId?: unknown;
    } | null;

    const message = typeof body?.message === "string" ? body.message : "";
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId : "";

    if (!message.trim()) {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const upstream = await fetch(getWebhookUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, sessionId }),
    });

    const text = await upstream.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!upstream.ok) {
      return Response.json(
        {
          error: "Webhook request failed",
          status: upstream.status,
          details: data,
        },
        { status: 502 }
      );
    }

    return Response.json({ data });
  } catch (err) {
    return Response.json(
      {
        error: "Unexpected error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
