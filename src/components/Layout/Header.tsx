'use client';

import React from 'react';
import { Container, Group, Title, Select, Burger, Anchor, Drawer, Stack, Divider, ActionIcon, useMantineColorScheme, Text, ComboboxItem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { PLFlag, GBFlag } from 'mantine-flagpack';
import classes from './Header.module.css';

const localeToFlagComponent = {
    pl: PLFlag,
    en: GBFlag,
};

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { colorScheme, setColorScheme } = useMantineColorScheme();


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

  const selectData = routing.locales.map((loc: string) => ({
      value: loc,
      label: loc.toUpperCase()
  }));

  const renderSelectOption = ({ option }: { option: ComboboxItem }) => {
    const FlagComponent = localeToFlagComponent[option.value as keyof typeof localeToFlagComponent];
    return (
      <Group gap="xs" wrap="nowrap">
        {FlagComponent && <FlagComponent w={18} />}
        <Text size="sm" span>{option.label}</Text>
      </Group>
    );
  };

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
           <Select
            size="xs"
            value={currentLocale}
            onChange={handleLocaleChange}
            data={selectData}
            allowDeselect={false}
            style={{ width: 100 }}
            aria-label="Change language"
            checkIconPosition="right"
            renderOption={renderSelectOption}
           />
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
            <Select
                label="Język / Language"
                value={currentLocale}
                onChange={handleLocaleChange}
                data={selectData}
                allowDeselect={false}
                aria-label="Change language"
                checkIconPosition="right"
                renderOption={renderSelectOption}
            />
            <Group justify='center' mt="md">
                {ThemeSwitcher}
            </Group>
         </Stack>
      </Drawer>
    </header>
  );
}