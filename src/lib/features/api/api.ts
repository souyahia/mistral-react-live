export interface AssistantSend {
  message: string;
  code?: string;
}

export interface AssistantResponse {
  timestamp: number;
  message: string;
}
