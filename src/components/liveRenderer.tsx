import { LiveError, LivePreview } from 'react-live';
import { useAppSelector } from '@/lib/hooks';
import styles from './liveRenderer.module.css';

export function LiveRenderer() {
  const currentVersion = useAppSelector((state) => state.code.currentVersion);
  return (
    <div className={styles.container}>
      {currentVersion === null ? (
        'Use the chat to generate your first component.'
      ) : (
        <>
          <LivePreview />
          <LiveError />
        </>
      )}
    </div>
  );
}
