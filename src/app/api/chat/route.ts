import businessInfo from "@/src/data/business-info.json";
import { generateChatResponse } from "@/src/lib/openai";
import { createSystemPrompt } from "@/src/lib/prompt";

interface ChatRequestBody {
  message: string;
}

function isChatRequestBody(value: unknown): value is ChatRequestBody {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "message" in value &&
    typeof value.message === "string" &&
    value.message.trim().length > 0
  );
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred while processing the chat request.";
}

/**
 * Handles Bella Beauty Studio chatbot requests.
 *
 * @param request - Incoming request containing a customer message.
 * @returns A JSON response with the assistant message or an error.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  if (!isChatRequestBody(body)) {
    return Response.json(
      { error: "The request body must include a non-empty message field." },
      { status: 400 },
    );
  }

  try {
    const systemPrompt = createSystemPrompt(businessInfo);
    const message = await generateChatResponse(systemPrompt, body.message.trim());

    return Response.json({ message }, { status: 200 });
  } catch (error) {
    return Response.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
