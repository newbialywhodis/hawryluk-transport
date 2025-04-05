import { Card, Container, SimpleGrid, Text, Title, rem } from '@mantine/core';
import { IconTruck, IconMapPins, IconUsers, IconCertificate } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';
import classes from './ServicesSection.module.css';

const servicesData = [
  { icon: IconTruck, titleKey: 'service1Title', descriptionKey: 'service1Desc' },
  { icon: IconMapPins, titleKey: 'service2Title', descriptionKey: 'service2Desc' },
  { icon: IconUsers, titleKey: 'service3Title', descriptionKey: 'service3Desc' },
  { icon: IconCertificate, titleKey: 'service4Title', descriptionKey: 'service4Desc' },
];

export async function ServicesSection() {
  const t = await getTranslations('HomePage');

  const features = servicesData.map((feature) => (
    <Card key={t(feature.titleKey)} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={1.5}
        color={'var(--mantine-color-myColor-6)'}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {t(feature.titleKey)}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {t(feature.descriptionKey)}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" id="services">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        {t('servicesSectionTitle')}
      </Title>
      <Text className={classes.description} ta="center" mt="md">
        {t('servicesSectionDesc')}
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}