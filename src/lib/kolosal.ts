import { KolosalChatResponse, KolosalMessage } from "./types";

const BASE_URL = process.env.KOLOSAL_BASE_URL || "https://api.kolosal.ai/v1";
const API_KEY = process.env.KOLOSAL_API_KEY;

if (!API_KEY) {
  throw new Error("KOLOSAL_API_KEY is not defined in environment variables");
}

export async function sendChatToKolosal(messages: KolosalMessage[]): Promise<string> {
  try {
    const modelID = "meta-llama/llama-4-maverick-17b-128e-instruct";

    console.log("Kolosal Request Model:", modelID);
    console.log("Kolosal Messages:", JSON.stringify(messages));

    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        Connection: "close",
      },
      body: JSON.stringify({
        model: modelID,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.5,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Kolosal API Error Status: ${response.status}`, errorData);
      throw new Error(`Kolosal API Error: ${response.status}`);
    }

    const data: KolosalChatResponse = await response.json();
    console.log("Kolosal Raw Response:", JSON.stringify(data));

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.warn("Kolosal Warning: Empty content received");
      return "";
    }

    if (typeof content === "string") return content;
    return JSON.stringify(content);
  } catch (error) {
    console.error("Failed to fetch from Kolosal:", error);
    throw error;
  }
}
