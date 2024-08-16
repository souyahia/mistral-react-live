import { ChatMessage, ChatRole } from '@/lib/features/chat/message';
import clsx from 'clsx';
import { IconUser } from '@tabler/icons-react';
import styles from './chatMessageItem.module.css';

export interface ChatMessageProps {
  message: ChatMessage;
  isFakeWritingMessage?: boolean;
}

function formatTimestamp(message: ChatMessage): string {
  const date = new Date(message.timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function ChatMessageItem({ message, isFakeWritingMessage = false }: ChatMessageProps) {
  const isAssistant = message.role === ChatRole.ASSISTANT;
  return (
    <div
      className={clsx(
        styles.container,
        isAssistant ? styles.assistant : styles.user,
        {
          [styles.fakeWriting]: isFakeWritingMessage,
        },
        {
          [styles.error]: message.isError,
        },
      )}
    >
      <div className={styles.profilePicture}>
        {!isAssistant && <IconUser color='#b9b9b9' style={{ width: '70%', height: '70%' }} />}
      </div>
      <div className={styles.content}>
        <div className={styles.messageBubbleLine}></div>
        <div className={styles.messageBubble}>
          {isFakeWritingMessage ? (
            <>
              <div></div>
              <div></div>
              <div></div>
            </>
          ) : (
            message.text
          )}
        </div>
        <div className={styles.messageBubbleArrow}></div>
      </div>
      <div className={styles.timestamp}>{formatTimestamp(message)}</div>
    </div>
  );
}
