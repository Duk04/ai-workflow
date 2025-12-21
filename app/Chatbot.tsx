"use client";

import * as React from "react";
import { MessageCircle, SendHorizonal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function extractAssistantText(payload: unknown): string {
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const extracted = extractAssistantText(item);
      if (extracted.trim()) return extracted;
    }
    return payload.length ? JSON.stringify(payload) : "";
  }
  if (typeof payload === "string") return payload;
  if (payload == null) return "";
  if (typeof payload !== "object") return String(payload);

  const obj = payload as Record<string, unknown>;
  const candidates = [
    obj.reply,
    obj.text,
    obj.message,
    obj.output,
    obj.response,
    obj.answer,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  if (obj.data !== undefined) {
    const extracted = extractAssistantText(obj.data);
    if (extracted.trim()) return extracted;
  }

  return JSON.stringify(payload);
}

function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";
  const key = "chatbot_session_id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const created =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session_${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(key, created);
  return created;
}

async function sendMessage(message: string, sessionId: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId }),
  });

  const json = (await res.json().catch(() => null)) as {
    data?: unknown;
    error?: unknown;
    details?: unknown;
  } | null;

  if (!res.ok) {
    const details = json?.details ?? json?.error ?? "Request failed";
    throw new Error(
      typeof details === "string" ? details : JSON.stringify(details)
    );
  }

  return json?.data;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string>("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Сайн байна уу! Та юу асуух вэ?",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length, isSending]);

  async function onSend() {
    const text = input.trim();
    if (!text || isSending) return;

    setError(null);
    setInput("");

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsSending(true);
    try {
      const data = await sendMessage(text, sessionId);
      const assistantText = extractAssistantText(data) || "(хоосон хариу)";
      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: "assistant", text: assistantText },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <Card className="w-96 max-w-[calc(100vw-3rem)] shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>AI Chatbot</CardTitle>
                <CardDescription>
                  Та асуултаа бичээд Enter дарж илгээнэ үү.
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div
              ref={listRef}
              className="h-72 overflow-y-auto rounded-md border border-input bg-background/50 p-3"
            >
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={
                      m.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "max-w-[85%] rounded-lg bg-primary px-3 py-2 text-primary-foreground"
                          : "max-w-[85%] rounded-lg bg-muted px-3 py-2 text-foreground"
                      }
                    >
                      <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}

                {isSending && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2 text-foreground">
                      <p className="text-sm opacity-80">Бичиж байна…</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void onSend();
              }}
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Асуултаа энд бичнэ үү…"
                disabled={isSending}
              />
              <Button type="submit" disabled={isSending || !input.trim()}>
                <SendHorizonal className="h-4 w-4" />
                Илгээх
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!isOpen && (
        <Button
          type="button"
          className="h-12 w-12 rounded-full p-0"
          aria-label="Open chat"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
