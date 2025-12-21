export const dynamic = "force-dynamic";

function getWebhookUrl() {
  return (
    process.env.N8N_WEBHOOK_URL ??
    "https://duk0426.app.n8n.cloud/webhook-test/be503623-e1a5-455a-97d8-b664a6e32b1f"
  );
}

function extractMessage(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const obj = body as Record<string, unknown>;

  const msg = obj.message;
  if (typeof msg === "string") return msg;
  if (msg && typeof msg === "object") {
    const maybeText = (msg as Record<string, unknown>).text;
    if (typeof maybeText === "string") return maybeText;
  }

  const fallbackCandidates = [obj.text, obj.input, obj.prompt];
  for (const candidate of fallbackCandidates) {
    if (typeof candidate === "string") return candidate;
  }

  return "";
}

function extractSessionId(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const obj = body as Record<string, unknown>;
  const sessionId = obj.sessionId;
  return typeof sessionId === "string" ? sessionId : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      message?: unknown;
      sessionId?: unknown;
    } | null;

    const message = extractMessage(body);
    const sessionId = extractSessionId(body);

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
