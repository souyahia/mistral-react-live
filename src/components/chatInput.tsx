import { ActionIcon, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { KeyboardEvent, useState } from 'react';
import styles from '@/components/chatInput.module.css';
import { useAppSelector } from '@/lib/hooks';
import { ChatRole } from '@/lib/features/chat/message';
import { useLazySendQuery } from '@/lib/features/api/apiSlice';

export function ChatInput() {
  const [input, setInput] = useState('');
  const [isControlHeld, setIsControlHeld] = useState(false);
  const [sendMessageToApi, { isFetching }] = useLazySendQuery();
  const messages = useAppSelector((state) => state.chat.messages);
  const code = useAppSelector((state) => state.code);
  const isSendDisabled =
    (messages.length > 0 && messages[messages.length - 1].role === ChatRole.USER) ||
    isFetching ||
    input.length < 5;

  const sendMessage = () => {
    if (!isSendDisabled) {
      sendMessageToApi({
        message: input,
        nextId: code.versions.length,
        code: code.currentVersion !== null ? code.code : undefined,
        currentId: code.currentVersion,
        edited: code.isEdited,
      });
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (isControlHeld) {
          setInput((value) => `${value}\n`);
          return;
        }
        sendMessage();
        e.preventDefault();
        break;
      case 'Control':
        setIsControlHeld(true);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setIsControlHeld(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatInputBorder}>
        <div className={styles.inputWrapper}>
          <Textarea
            value={input}
            classNames={{ input: styles.textArea }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            autosize
            minRows={1}
            maxRows={5}
            placeholder={
              messages.length > 1
                ? 'Switch to rounded corners for the first button...'
                : 'A blue button that changes width on hover...'
            }
          />
        </div>
        <ActionIcon
          onClick={sendMessage}
          disabled={isSendDisabled}
          variant='light'
          size='lg'
          color='#FF7002'
          aria-label='Close Sidebar'
        >
          <IconSend stroke={2} style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </div>
    </div>
  );
}
