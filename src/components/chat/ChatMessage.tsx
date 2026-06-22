import type { ChatMessage } from "../../types/chat";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return <p data-role={message.role}>{message.content}</p>;
}
