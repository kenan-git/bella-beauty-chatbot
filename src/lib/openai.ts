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
