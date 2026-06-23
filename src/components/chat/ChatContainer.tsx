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
        "Hello! Welcome to Bella Beauty Studio. I can help with services, prices, working hours, promotions, location, or appointment requests.",
      createdAt: new Date().toISOString(),
    }),
    [],
  );

  return (
    <section
      aria-label="Bella Beauty Studio customer support chat"
      className="mx-auto flex h-[min(720px,calc(100vh-2rem))] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 shadow-2xl shadow-neutral-200/70"
    >
      <header className="border-b border-neutral-200 bg-white px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Bella Beauty Studio
        </p>
        <h2 className="mt-1 text-lg font-semibold text-neutral-950">
          AI Customer Support
        </h2>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <ChatMessage message={welcomeMessage} />

        {!hasUserMessages ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => {
                  void sendMessage(question);
                }}
                disabled={isLoading}
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left text-sm font-medium text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-950 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
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
