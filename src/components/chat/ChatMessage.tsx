import type { ChatMessage as ChatMessageType } from "../../types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser ? (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-xs font-bold text-white shadow-md shadow-rose-200">
          AI
        </div>
      ) : null}

      <article
        className={`max-w-[84%] rounded-[1.35rem] px-5 py-4 text-[15px] leading-7 shadow-sm sm:max-w-[72%] ${
          isUser
            ? "rounded-br-md bg-neutral-950 text-white shadow-neutral-300/70"
            : "rounded-bl-md border border-white/80 bg-white text-neutral-800 shadow-neutral-200/80"
        }`}
      >
        <p className="whitespace-pre-line">{message.content}</p>
      </article>
    </div>
  );
}
