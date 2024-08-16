import { ChatMessage, ChatRole } from '@/lib/features/chat/message';
import clsx from 'clsx';
import { IconPaperclip, IconUser } from '@tabler/icons-react';
import { Button, Tooltip } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loadVersion } from '@/lib/features/code/codeSlice';
import styles from './chatMessageItem.module.css';

export interface ChatMessageProps {
  message: ChatMessage;
  isFakeWritingMessage?: boolean;
}

function formatTimestamp(message: ChatMessage): string {
  const date = new Date(message.timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function getTooltipLabel(role: ChatRole, isLoadCodeAvailable?: boolean): string {
  if (role === ChatRole.USER) {
    return 'The version you used when sending your request';
  }
  return isLoadCodeAvailable ? 'Load Code Version' : 'This code version is already loaded';
}

export function ChatMessageItem({ message, isFakeWritingMessage = false }: ChatMessageProps) {
  const { isEdited, currentVersion } = useAppSelector((state) => state.code);
  const dispatch = useAppDispatch();
  const isAssistant = message.role === ChatRole.ASSISTANT;
  const isLoadCodeAvailable =
    isAssistant && message.code && (currentVersion !== message.code.id || isEdited);

  const handleLoadVersion = () => {
    if (isLoadCodeAvailable && message.code?.id !== undefined) {
      dispatch(loadVersion(message.code.id));
    }
  };

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
        {message.code && (
          <Tooltip label={getTooltipLabel(message.role, isLoadCodeAvailable)}>
            <Button
              onClick={handleLoadVersion}
              variant='outline'
              leftSection={<IconPaperclip size={14} />}
              disabled={!isLoadCodeAvailable}
              size={message.role === ChatRole.USER ? 'xs' : 'md'}
              className={clsx(styles.version, { [styles.edited]: message.isEditedVersion })}
              color='#FF7002'
            >
              {`Attached: Version #${message.code.id + 1}${message.isEditedVersion ? ' (edited)' : ''}`}
            </Button>
          </Tooltip>
        )}
      </div>
      <div className={styles.timestamp}>{formatTimestamp(message)}</div>
    </div>
  );
}
