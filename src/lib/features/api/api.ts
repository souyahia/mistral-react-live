export interface AssistantSend {
  message: string;
  nextId: number;
  currentId: number | null;
  edited?: boolean;
  code?: string;
}

export interface AssistantResponse {
  message: string;
  code?: string;
}
