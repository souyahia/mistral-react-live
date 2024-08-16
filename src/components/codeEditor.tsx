import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { editCurrentCodeVersion } from '@/lib/features/code/codeSlice';
import { IconMessageReply } from '@tabler/icons-react';
import { ActionIcon, Tooltip } from '@mantine/core';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import clsx from 'clsx';
import styles from './codeEditor.module.css';

function formatVersion(currentVersion: number | null, isEdited: boolean): string {
  if (currentVersion === null) {
    return '';
  }
  return `Version #${currentVersion + 1}${isEdited ? '* (edited)' : ''}`;
}

export function CodeEditor() {
  const { code, currentVersion, isEdited } = useAppSelector((state: RootState) => state.code);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={clsx(styles.infoBar, { [styles.edited]: isEdited })}>
        <Tooltip label='Show Version In Chat'>
          <ActionIcon
            onClick={() => console.log('See version in chat clicked')}
            className={styles.openInChat}
            variant='subtle'
            size='md'
            color='#FF7002'
            aria-label='Open In Chat'
          >
            <IconMessageReply stroke={2} style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        </Tooltip>
        {formatVersion(currentVersion, isEdited)}
      </div>
      <div className={styles.editorContainer}>
        <AceEditor
          className={styles.editor}
          value={code}
          mode='javascript'
          theme='monokai'
          onChange={(value) => dispatch(editCurrentCodeVersion(value))}
          name='UNIQUE_ID_OF_DIV'
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  );
}
