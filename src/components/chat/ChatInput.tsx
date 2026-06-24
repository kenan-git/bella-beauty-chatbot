"use client";

import type { FormEvent } from "react";
import { useState } from "react";

interface ChatInputProps {
  isLoading: boolean;
  onSubmit: (message: string) => void | Promise<void>;
}

export function ChatInput({ isLoading, onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const trimmedMessage = message.trim();
  const isDisabled = isLoading || trimmedMessage.length === 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    await onSubmit(trimmedMessage);
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur sm:p-5"
    >
      <label htmlFor="chat-message" className="sr-only">
        Message
      </label>
      <input
        id="chat-message"
        name="message"
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        disabled={isLoading}
        placeholder="Ask about services, prices, or bookings..."
        className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-3.5 text-sm text-neutral-900 shadow-inner outline-none transition placeholder:text-neutral-400 focus:border-rose-300 focus:bg-white focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="rounded-full bg-gradient-to-r from-neutral-950 to-neutral-800 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neutral-300/70 transition hover:-translate-y-0.5 hover:from-rose-600 hover:to-fuchsia-600 hover:shadow-rose-200 disabled:cursor-not-allowed disabled:bg-none disabled:bg-neutral-300 disabled:shadow-none sm:px-7"
      >
        Send
      </button>
    </form>
  );
}
