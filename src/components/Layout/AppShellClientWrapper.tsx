'use client';

import React from 'react';
import { AppShell } from '@mantine/core';
import { Header } from './Header';
import { Footer } from './Footer';

type Props = {
  children: React.ReactNode;
};

export function AppShellClientWrapper({ children }: Props) {
  return (
    <AppShell
      header={{ height: 70 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <Footer />
    </AppShell>
  );
}