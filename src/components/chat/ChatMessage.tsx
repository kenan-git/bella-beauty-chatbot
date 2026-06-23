import type { ChatMessage as ChatMessageType } from "../../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <article
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[70%] ${
          isUser
            ? "rounded-br-md bg-neutral-950 text-white"
            : "rounded-bl-md border border-neutral-200 bg-white text-neutral-800"
        }`}
      >
        <p className="whitespace-pre-line">{message.content}</p>
      </article>
    </div>
  );
}
