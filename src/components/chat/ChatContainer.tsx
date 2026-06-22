import type { ReactNode } from "react";

interface ChatContainerProps {
  children?: ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  return <section aria-label="Customer support chat">{children}</section>;
}
