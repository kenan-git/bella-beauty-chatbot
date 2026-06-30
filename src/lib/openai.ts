import "server-only";

import OpenAI from "openai";

const EMPTY_RESPONSE_FALLBACK =
  "I’m sorry, I couldn’t generate a response right now. Please try again in a moment.";

let openAIClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is missing. Add it to your server environment before using the chat service.",
    );
  }

  openAIClient ??= new OpenAI({ apiKey });

  return openAIClient;
}

function includesAny(message: string, keywords: string[]): boolean {
  return keywords.some((keyword) => message.includes(keyword));
}

function generateMockChatResponse(userMessage: string): string {
  const normalizedMessage = userMessage.toLowerCase();

  if (includesAny(normalizedMessage, ["services", "service"])) {
    return "We offer Hair Cut, Hair Coloring, Manicure, Pedicure, Facial Treatment and Eyebrow Shaping.";
  }

  if (includesAny(normalizedMessage, ["price", "pricing", "cost"])) {
    return "Our prices start from $20 and vary depending on the selected service.";
  }

  if (includesAny(normalizedMessage, ["hours", "open"])) {
    return "We are open Monday to Saturday from 09:00 AM to 07:00 PM.";
  }

  if (includesAny(normalizedMessage, ["address", "location"])) {
    return "We are located at 123 Beauty Street, Miami, FL 33101.";
  }

  if (includesAny(normalizedMessage, ["promotion", "discount"])) {
    return "We currently offer Hair Coloring + Hair Cut with 15% discount and Manicure + Pedicure with 10% discount.";
  }

  if (includesAny(normalizedMessage, ["appointment", "booking", "book"])) {
    return "To book an appointment, please provide your full name, phone number and desired service.";
  }

  return "Hello! How can I help you with our beauty services today?";
}

/**
 * Generates a response from the Bella Beauty Studio support assistant.
 *
 * @param systemPrompt - Instructions and business context for the assistant.
 * @param userMessage - The customer's message.
 * @returns The assistant's text response.
 * @throws If the API key is missing or the OpenAI request cannot be completed.
 */
export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  if (process.env.USE_MOCK_AI === "true") {
    return generateMockChatResponse(userMessage);
  }

  try {
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    const response = completion.choices[0]?.message.content?.trim();

    return response ?? EMPTY_RESPONSE_FALLBACK;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("OPENAI_API_KEY is missing")
    ) {
      throw error;
    }

    const details = error instanceof Error ? ` ${error.message}` : "";

    throw new Error(
      `Unable to generate a chat response with OpenAI.${details}`,
    );
  }
}
