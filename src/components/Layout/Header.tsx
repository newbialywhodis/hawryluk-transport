'use client';

import React from 'react';
import {
  Container, Group, Title, Burger, Anchor, Drawer, Stack, Divider, ActionIcon,
  useMantineColorScheme, Text, Menu, UnstyledButton, Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { IconSun, IconMoon, IconChevronDown } from '@tabler/icons-react';
import { PLFlag, GBFlag } from 'mantine-flagpack';
import classes from './Header.module.css';

const localeToFlagComponent: Record<string, React.FC<{ w?: number; h?: number }>> = {
  pl: PLFlag,
  en: GBFlag,
};

const localeToFullName: Record<string, string> = {
  pl: 'Polish',
  en: 'English',
};

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [menuOpened, setMenuOpened] = React.useState(false);

  const handleLocaleChange = (newLocale: string | null) => {
    if (newLocale && newLocale !== currentLocale) {
      router.push(pathname, { locale: newLocale });
      close();
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId.substring(1));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    close();
  };

  const sectionLinks = [
    { link: '#services', label: t('navServices') },
    { link: '#map', label: t('navMap') },
    { link: '#contact', label: t('navContact') },
  ];

  const items = sectionLinks.map((item) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={classes.link}
      onClick={(e) => scrollToSection(e, item.link)}
    >
      {item.label}
    </Anchor>
  ));

  const languageData = routing.locales.map((loc: string) => {
    const FlagComponent = localeToFlagComponent[loc];
    const fullName = localeToFullName[loc] || loc.toUpperCase();
    return {
      value: loc,
      label: fullName,
      Flag: FlagComponent,
    };
  });

  const selectedLanguage = languageData.find(lang => lang.value === currentLocale) || languageData[0];

  const menuItems = languageData.map((item) => (
    <Menu.Item
      key={item.value}
      leftSection={item.Flag ? <item.Flag w={18} h={18} /> : undefined}
      onClick={() => handleLocaleChange(item.value)}
      disabled={item.value === currentLocale}
    >
      {item.label}
    </Menu.Item>
  ));

  const LanguageSwitcher = (
    <Menu
      width="target"
      withinPortal
      onOpen={() => setMenuOpened(true)}
      onClose={() => setMenuOpened(false)}
      radius="md"
      shadow="md"
    >
      <Menu.Target>
        <UnstyledButton className={classes.languageControl} data-expanded={menuOpened || undefined}>
        <Group gap="xs" align="center" wrap="nowrap">
            {selectedLanguage.Flag && (
              <selectedLanguage.Flag
                w={22}
                h={22}
              />
            )}
            <Text size="sm" span fw={500} style={{ lineHeight: 1 }}>
              {selectedLanguage.label}
            </Text>
          </Group>
          <IconChevronDown size={16} className={classes.languageIcon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    </Menu>
  );

  const ThemeSwitcher = (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
    </ActionIcon>
  );

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Title order={1} size="h3">
          {t('companyName')}
        </Title>

        <Group gap={15} visibleFrom="sm">
          {items}
          {LanguageSwitcher}
          {ThemeSwitcher}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        title={t('companyName')}
        hiddenFrom="sm"
        zIndex={1000000}
        padding="md"
        size="md"
      >
        <Stack gap="md">
          {items}
          <Divider my="sm" />
          <Text size="sm" fw={500} mb={5}>Język / Language:</Text>
          {LanguageSwitcher}
          <Group justify='center' mt="md">
            {ThemeSwitcher}
          </Group>
        </Stack>
      </Drawer>
    </header>
  );
}