'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#eef3ff',
  '#dce4f5',
  '#b9c7e2',
  '#94a8d0',
  '#748cc1',
  '#5f7cb8',
  '#5474b4',
  '#4563a0',
  '#3b5890',
  '#2f4b80'
];

export const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  primaryColor: 'myColor',
  colors: {
      myColor,
  },
});