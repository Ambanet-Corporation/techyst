export interface KolosalContentPart {
  type: "text" | "image_url";
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface KolosalMessage {
  role: "system" | "user" | "assistant";
  content: string | KolosalContentPart[];
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
