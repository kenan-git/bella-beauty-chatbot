"use client";

import type { ChatMessage } from "../types/chat";

export interface UseChatResult {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function useChat(): UseChatResult {
  return {
    messages: [],
    isLoading: false,
  };
}
