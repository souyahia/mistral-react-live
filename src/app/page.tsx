'use client';

import { SideBar } from '@/components/sideBar';
import { LiveRenderer } from '@/components/liveRenderer';
import { LiveProvider } from 'react-live';
import { useAppSelector } from '@/lib/hooks';
import styles from './page.module.css';

export default function Home() {
  const code = useAppSelector((state) => state.code.code);

  return (
    <div className={styles.main}>
      <LiveProvider code={code} noInline>
        <SideBar />
        <LiveRenderer />
      </LiveProvider>
    </div>
  );
}
