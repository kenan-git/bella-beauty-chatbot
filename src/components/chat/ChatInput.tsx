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
      className="flex gap-2 border-t border-neutral-200 bg-white p-3 sm:p-4"
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
        className="min-w-0 flex-1 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        Send
      </button>
    </form>
  );
}
