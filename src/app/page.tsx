'use client';

// import { useState } from 'react';
// import { ControlBar } from '@/app/components/controlBar';
// import { LiveRenderer } from '@/app/components/liveRenderer';
import { SideBar } from '@/components/sideBar';
import { LiveRenderer } from '@/components/liveRenderer';
import styles from './page.module.css';

// const testCode =
//   "const Button = () => {\n  const [isHovered, setIsHovered] = React.useState(false);\n\n  const buttonStyle = {\n    backgroundColor: 'blue',\n    color: 'white',\n    padding: '10px 20px',\n    border: 'none',\n    cursor: 'pointer',\n    width: isHovered ? '200px' : '100px',\n    transition: 'width 0.3s'\n  };\n\n  return (\n    <button\n      style={buttonStyle}\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n    >\n      Hover Me!\n    </button>\n  );\n};render(<Button />);";

export default function Home() {
  return (
    <div className={styles.main}>
      <SideBar />
      <LiveRenderer />
      {/* <ControlBar */}
      {/*  isEditorOpened={isEditorOpened} */}
      {/*  onToggleEditor={() => setIsEditorOpened((value) => !value)} */}
      {/* /> */}
      {/* <LiveRenderer code={testCode} isEditorOpened={isEditorOpened} /> */}
    </div>
  );
}
