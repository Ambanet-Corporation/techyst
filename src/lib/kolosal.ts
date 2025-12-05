import { KolosalChatResponse, KolosalMessage } from "./types";

const BASE_URL = process.env.KOLOSAL_BASE_URL || "https://api.kolosal.ai/v1";
const API_KEY = process.env.KOLOSAL_API_KEY;

if (!API_KEY) {
  throw new Error("KOLOSAL_API_KEY is not defined in environment variables");
}

export async function sendChatToKolosal(messages: KolosalMessage[]): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "GLM 4.6",
        messages: messages,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Kolosal API Error: ${response.status} - ${errorData}`);
    }

    const data: KolosalChatResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Failed to fetch from Kolosal:", error);
    throw error;
  }
}
