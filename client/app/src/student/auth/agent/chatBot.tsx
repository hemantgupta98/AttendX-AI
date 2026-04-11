"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

type Message = {
  role: "user" | "bot";
  text: string;
};

type ParsedSection = {
  title: string;
  content: string;
  steps: string[];
};

type ChatBotPanelProps = {
  onClose?: () => void;
};

const extractBotReply = (payload: unknown): string | null => {
  if (typeof payload === "string") return payload;

  if (!payload || typeof payload !== "object") return null;

  const data = payload as Record<string, unknown>;

  const directText = [
    data.answer,
    data.reply,
    data.response,
    data.output,
    data.text,
    data.message,
  ].find(
    (value): value is string =>
      typeof value === "string" && value.trim().length > 0,
  );

  if (directText) return directText;

  const nested = data.data;
  if (nested && typeof nested === "object") {
    const nestedData = nested as Record<string, unknown>;
    const nestedText = [
      nestedData.answer,
      nestedData.reply,
      nestedData.response,
      nestedData.output,
      nestedData.text,
      nestedData.message,
    ].find(
      (value): value is string =>
        typeof value === "string" && value.trim().length > 0,
    );

    if (nestedText) return nestedText;
  }

  return null;
};

const parseAgentSections = (text: string): ParsedSection[] => {
  const normalized = text.replace(/\s*👉\s*/g, "\n👉 ").trim();
  const sectionRegex = /👉\s*\*\*([^*]+)\*\*:?([\s\S]*?)(?=\n👉\s*\*\*|$)/g;
  const sections: ParsedSection[] = [];

  for (const match of normalized.matchAll(sectionRegex)) {
    const title = match[1].trim();
    const body = (match[2] || "").replace(/\*\*/g, "").trim();

    const stepMatches = body.match(/\d+\.\s[^\d]+?(?=\s\d+\.|$)/g);
    const steps = stepMatches?.map((step) => step.trim()) ?? [];

    const content = steps.length
      ? body.replace(/\d+\.\s[^\d]+?(?=\s\d+\.|$)/g, "").trim()
      : body;

    sections.push({ title, content, steps });
  }

  return sections;
};

export default function ChatBotPanel({ onClose }: ChatBotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const webhookUrl =
    process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
    "https://hemantgupta98.app.n8n.cloud/webhook/3978c682-d1fb-49c3-a4ee-6c09df53b509/chat";

  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", crypto.randomUUID());
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input.trim() };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);

    try {
      const res = await axios.post(
        webhookUrl,
        {
          chatInput: userMessage.text,
          sessionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      const replyText = extractBotReply(data);

      console.log("Webhook response:", res.data);

      if (
        data &&
        typeof data === "object" &&
        ("error" in data ||
          ("status" in data &&
            (data as { status?: string }).status === "error"))
      ) {
        const errorData = data as { error?: string; message?: string };
        const errorMessage =
          errorData.error || errorData.message || "Agent returned an error";
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: `Warning: ${errorMessage}` },
        ]);
      } else if (!replyText) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "No response from agent. Check browser console to see webhook response shape.",
          },
        ]);
      } else {
        const botMessage: Message = {
          role: "bot",
          text: replyText,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Request error:", error);

      const errorMsg =
        axios.isAxiosError(error) && error.response
          ? `Agent error: ${error.response.status} ${error.response.statusText}`
          : "Failed to connect to server";

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Error: ${errorMsg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-xl">
      <div className="flex items-center justify-between bg-blue-600 p-3 font-semibold text-white">
        <span>Customer Support</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 transition hover:bg-white/15"
            aria-label="Close chatbot"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.length === 0 && (
          <div className="rounded-lg bg-slate-100 p-2 text-sm text-slate-600">
            Start a chat with your AI agent.
          </div>
        )}

        {messages.map((msg, index) => {
          const sections =
            msg.role === "bot" ? parseAgentSections(msg.text) : [];

          return (
            <div
              key={index}
              className={`max-w-[85%] rounded-lg p-3 ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.role === "bot" && sections.length > 0 ? (
                <div className="space-y-3 text-sm leading-6">
                  {sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="rounded-md bg-white/60 p-2"
                    >
                      <p className="font-semibold text-blue-700">
                        {section.title}
                      </p>
                      {section.content && (
                        <p className="mt-1 text-slate-700">{section.content}</p>
                      )}
                      {section.steps.length > 0 && (
                        <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-700">
                          {section.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>
                              {step.replace(/^\d+\.\s*/, "")}
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-6">
                  {msg.text}
                </p>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="w-fit rounded-lg bg-gray-200 p-2 text-black">
            Typing...
          </div>
        )}
      </div>

      <div className="flex gap-2 border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your issue..."
          className="flex-1 rounded-lg border px-2 py-1 outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="rounded-lg bg-blue-600 px-3 text-white disabled:opacity-60"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
