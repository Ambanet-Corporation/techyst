export interface KolosalMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface KolosalChatResponse {
  id: string;
  choices: {
    index: number;
    message: KolosalMessage;
    finish_reason: string;
  }[];
}

export interface APIError {
  error: string;
  details?: string;
}
