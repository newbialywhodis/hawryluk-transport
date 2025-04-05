'use client';

import { Container, Text, Group, Anchor, Stack } from '@mantine/core';
import { useTranslations } from 'next-intl';
import classes from './Footer.module.css';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const companyName = t('Footer.companyName');

  return (
    <footer className={classes.footer}>
      <Container size="xl" py="xl">
        <Stack gap="xs">
          <Text size="lg" fw={700}>{companyName}</Text>
          <Text size="sm">{t('Footer.addressLabel')}: {t('ContactDetails.address')}</Text>
          <Text size="sm">{t('Footer.nipLabel')}: {t('ContactDetails.nip')}</Text>
          <Text size="sm">{t('Footer.regonLabel')}: {t('ContactDetails.regon')}</Text>
          <Text size="sm">
            {t('Footer.phoneLabel')}:{' '}
            <Anchor href={`tel:${t('ContactDetails.phone').replace(/\s|\+/g, '')}`}>
                {t('ContactDetails.phone')}
            </Anchor>
          </Text>
          <Text size="sm">
            {t('Footer.bankAccountLabel')}: {t('ContactDetails.bankAccount')} ({t('Footer.bankName')})
          </Text>
        </Stack>
        <Group mt="md" justify="space-between">
          <Text size="xs" c="dimmed">
            {t('Footer.copyright', { year, companyName })}
          </Text>
        </Group>
      </Container>
    </footer>
  );
}