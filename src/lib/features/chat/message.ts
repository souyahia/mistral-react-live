import { CodeVersion } from '@/lib/features/code/code';

export enum ChatRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface ChatMessage {
  timestamp: number;
  role: ChatRole;
  text: string;
  isError: boolean;
  code?: CodeVersion;
}
