import { useState } from 'react';
import { ActionIcon, Button, Text, Tooltip } from '@mantine/core';
import { IconChevronLeft, IconCode, IconMessageCode, IconMessages, IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';
import { Chat } from '@/components/chat';
import { CodeEditor } from '@/components/codeEditor';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { modals } from '@mantine/modals';
import { clearMessages } from '@/lib/features/chat/chatSlice';
import { clearCodeVersions } from '@/lib/features/code/codeSlice';
import styles from './sideBar.module.css';

enum SideBarView {
  CHAT = 'chat',
  EDITOR = 'editor',
}

export function SideBar() {
  const [isOpened, setIsOpened] = useState(true);
  const [view, setView] = useState(SideBarView.CHAT);
  const messages = useAppSelector((state) => state.chat.messages);
  const dispatch = useAppDispatch();

  const toggleView = () => {
    setView((value) => (value === SideBarView.CHAT ? SideBarView.EDITOR : SideBarView.CHAT));
  };

  const clearSession = () => {
    modals.openConfirmModal({
      title: 'Session clear confirmation',
      centered: true,
      children: (
        <Text>
          Are you sure you want to clear the current session? All progress and code versions will be
          lost.
        </Text>
      ),
      labels: { confirm: 'Proceed', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        dispatch(clearMessages());
        dispatch(clearCodeVersions());
      },
    });
  };

  return (
    <div className={clsx(styles.container, { [styles.opened]: isOpened })}>
      <div className={clsx(styles.sideBar, { [styles.opened]: isOpened })}>
        <div className={styles.header}>
          <div className={styles.title}>Mistral React Live</div>
          <div className={styles.end}>
            <Tooltip label='Clear Session'>
              <ActionIcon
                onClick={clearSession}
                disabled={messages.length <= 1}
                className={styles.closeButton}
                variant='light'
                size='lg'
                color='#b11414'
                aria-label='Clear Session'
              >
                <IconTrash stroke={2} style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            </Tooltip>
            <Button
              onClick={toggleView}
              leftSection={
                view === SideBarView.CHAT ? <IconCode size={14} /> : <IconMessages size={14} />
              }
              className={styles.leftDivider}
              variant='light'
              color='#FF7002'
            >
              {view === SideBarView.CHAT ? 'Code Editor' : 'Code Assistant'}
            </Button>
            <ActionIcon
              onClick={() => setIsOpened(false)}
              className={styles.leftDivider}
              variant='subtle'
              size='lg'
              color='#FF7002'
              aria-label='Close Sidebar'
            >
              <IconChevronLeft stroke={2} style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          </div>
        </div>
        <div className={styles.content}>
          {view === SideBarView.CHAT ? <Chat /> : <CodeEditor />}
        </div>
      </div>
      <ActionIcon
        onClick={() => setIsOpened(true)}
        disabled={isOpened}
        className={clsx(styles.openButton, { [styles.opened]: isOpened })}
        variant='filled'
        size='xl'
        color='#FF7002'
        aria-label='Open Sidebar'
      >
        <IconMessageCode stroke={2} style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </div>
  );
}
