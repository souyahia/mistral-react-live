import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import './globals.css';
import StoreProvider from '@/app/storeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mistral React Live',
  description: 'Your personal coding assistant using Mistral AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme='dark'>
          <ModalsProvider>
            <StoreProvider>
              <body className={inter.className}>{children}</body>
            </StoreProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
