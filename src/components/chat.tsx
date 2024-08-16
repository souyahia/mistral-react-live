import { ChatInput } from '@/components/chatInput';
import { useAppSelector } from '@/lib/hooks';
import { ChatMessageItem } from '@/components/chatMessageItem';
import { ScrollArea } from '@mantine/core';
import { useEffect, useMemo, useRef } from 'react';
import { ChatRole } from '@/lib/features/chat/message';
import styles from './chat.module.css';

export function Chat() {
  const messages = useAppSelector((state) => state.chat.messages);
  const viewportRef = useRef<HTMLDivElement>(null);

  const assistantFakeWritingMessage = useMemo(
    () =>
      messages.length > 0 && messages[messages.length - 1].role === ChatRole.USER
        ? {
            text: '...',
            timestamp: Date.now(),
            isError: false,
            role: ChatRole.ASSISTANT,
          }
        : null,
    [messages],
  );

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current?.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea viewportRef={viewportRef} h='100%' w='100%' scrollbarSize={5}>
      <div className={styles.container}>
        {messages.map((message) => (
          <ChatMessageItem key={message.timestamp} message={message} />
        ))}
        {assistantFakeWritingMessage && (
          <ChatMessageItem message={assistantFakeWritingMessage} isFakeWritingMessage />
        )}
        <ChatInput />
      </div>
    </ScrollArea>
  );
}
