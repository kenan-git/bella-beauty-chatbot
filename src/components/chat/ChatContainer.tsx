"use client";

import { useMemo } from "react";

import { useChat } from "../../hooks/useChat";
import type { ChatMessage as ChatMessageType } from "../../types/chat";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "Show me your prices",
  "What are your working hours?",
  "I want to book an appointment",
];

export function ChatContainer() {
  const { messages, isLoading, error, sendMessage } = useChat();
  const hasUserMessages = messages.some((message) => message.role === "user");

  const welcomeMessage = useMemo<ChatMessageType>(
    () => ({
      id: "bella-welcome-message",
      role: "assistant",
      content:
        "Welcome to Bella Beauty Studio! 🌸\n\nI'm your virtual beauty assistant.\n\nI can help you with:\n• Services\n• Prices\n• Working hours\n• Promotions\n• Appointment requests",
      createdAt: new Date().toISOString(),
    }),
    [],
  );

  return (
    <section
      aria-label="Bella Beauty Studio customer support chat"
      className="mx-auto flex h-[min(760px,calc(100vh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-neutral-50 shadow-2xl shadow-rose-100/80 ring-1 ring-neutral-950/5"
    >
      <header className="border-b border-neutral-200 bg-white/95 px-5 py-5 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-rose-200">
            AI
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Bella Beauty Studio
            </p>
            <h2 className="mt-1 text-lg font-semibold text-neutral-950">
              AI Customer Support
            </h2>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto bg-gradient-to-b from-rose-50/50 to-neutral-50 p-4 sm:p-6">
        <ChatMessage message={welcomeMessage} />

        {!hasUserMessages ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => {
                  void sendMessage(question);
                }}
                disabled={isLoading}
                className="rounded-2xl border border-white/80 bg-white/90 px-4 py-3.5 text-left text-sm font-semibold text-neutral-700 shadow-sm shadow-neutral-200/70 transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-neutral-950 hover:text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {question}
              </button>
            ))}
          </div>
        ) : null}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading ? <TypingIndicator /> : null}

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
      </div>

      <ChatInput isLoading={isLoading} onSubmit={sendMessage} />
    </section>
  );
}
