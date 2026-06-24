import businessInfo from "../../../src/data/business-info.json";
import { extractLeadFromMessage, saveLead } from "../../../src/lib/lead-manager";
import { generateChatResponse } from "../../../src/lib/openai";
import { createSystemPrompt } from "../../../src/lib/prompt";

const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
const LEAD_SAVED_MESSAGE =
  "Your appointment request has been saved. Our team will contact you soon.";
const REQUIRED_MESSAGE_ERROR = "Message is required.";

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

function getErrorLogDetails(error: unknown): { message: string; stack?: string } {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: "Unknown non-Error exception was thrown.",
  };
}

function logChatError(message: string, error: unknown): void {
  const details = getErrorLogDetails(error);

  console.error("[chat-api]", {
    message,
    error,
    errorMessage: details.message,
    stack: details.stack,
  });
}

function createErrorResponse(error: unknown, status: number): Response {
  const details = getErrorLogDetails(error);

  if (process.env.NODE_ENV === "development") {
    return Response.json(
      { error: GENERIC_ERROR_MESSAGE, debugMessage: details.message },
      { status },
    );
  }

  return Response.json({ error: GENERIC_ERROR_MESSAGE }, { status });
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
  } catch (error) {
    logChatError("Failed to parse request body as JSON.", error);

    return createErrorResponse(error, 400);
  }

  if (!isChatRequestBody(body)) {
    return Response.json({ error: REQUIRED_MESSAGE_ERROR }, { status: 400 });
  }

  try {
    const userMessage = body.message.trim();
    const leadInput = extractLeadFromMessage(userMessage);
    const systemPrompt = createSystemPrompt(businessInfo);
    const aiResponse = await generateChatResponse(systemPrompt, userMessage);

    if (leadInput) {
      await saveLead(leadInput);

      return Response.json(
        { message: `${aiResponse}\n\n${LEAD_SAVED_MESSAGE}` },
        { status: 200 },
      );
    }

    return Response.json({ message: aiResponse }, { status: 200 });
  } catch (error) {
    logChatError(
      "Failed while generating chat response. Check business data import, createSystemPrompt import, generateChatResponse import, and OPENAI_API_KEY configuration.",
      error,
    );

    return createErrorResponse(error, 500);
  }
}
