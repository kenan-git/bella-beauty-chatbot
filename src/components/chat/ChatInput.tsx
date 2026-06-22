"use client";

import type { FormEvent } from "react";

interface ChatInputProps {
  onSubmit?: (message: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get("message") ?? "").trim();

    if (message) {
      onSubmit?.(message);
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chat-message">Message</label>
      <input id="chat-message" name="message" type="text" />
      <button type="submit">Send</button>
    </form>
  );
}
