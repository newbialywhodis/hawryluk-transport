import { Container, Title, Text, SimpleGrid, ThemeIcon, rem, Group, Stack, Box } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import { IconClockHour4, IconLicense, IconAdjustmentsHorizontal, IconShieldCheck } from '@tabler/icons-react';

export async function WhyUsSection() {
  const t = await getTranslations('WhyUsSection');

  const points = [
    { icon: IconClockHour4, titleKey: 'p1Title', descKey: 'p1Desc' },
    { icon: IconLicense, titleKey: 'p2Title', descKey: 'p2Desc' },
    { icon: IconAdjustmentsHorizontal, titleKey: 'p3Title', descKey: 'p3Desc' },
    { icon: IconShieldCheck, titleKey: 'p4Title', descKey: 'p4Desc' },
  ];

  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="xl">
        {t('title')}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        {points.map((point) => (
          <Box key={point.titleKey}>
            <Group wrap="nowrap" align="flex-start" gap="md">
              <ThemeIcon size="lg" variant="light" radius="md">
                <point.icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
              </ThemeIcon>
              <Stack gap={4}>
                <Text fw={700} fz="lg" lh={1.2}>
                  {t(point.titleKey)}
                </Text>
                <Text c="dimmed" size="sm">
                  {t(point.descKey)}
                </Text>
              </Stack>
            </Group>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}