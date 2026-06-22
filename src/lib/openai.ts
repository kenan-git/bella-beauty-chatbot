import "server-only";

import OpenAI from "openai";

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
 * @throws If the API key is missing or OpenAI returns an empty response.
 */
export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  const client = getOpenAIClient();
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  const response = completion.choices[0]?.message.content?.trim();

  if (!response) {
    throw new Error("OpenAI returned an empty chat response.");
  }

  return response;
}
