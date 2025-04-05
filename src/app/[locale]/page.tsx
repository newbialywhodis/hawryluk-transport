import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container, Title, Text, Button, SimpleGrid, Stack, Group, ThemeIcon, Paper, Anchor, List, ListItem } from '@mantine/core';
import { IconCircleCheck, IconMapPin, IconPhone } from '@tabler/icons-react';

import { MapComponent } from '@/components/Shared/MapComponent';
import { ContactForm } from '@/components/Contact/ContactForm';
import { HeroSection } from '@/components/Home/HeroSection';
import { ServicesSection } from '@/components/Home/ServicesSection';
import { ContactSection } from '@/components/Contact/ContactSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const tContact = await getTranslations('ContactDetails');
  const tFooter = await getTranslations('Footer');
  const tForm = await getTranslations('ContactForm');

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Container size="xl" id="map" my="xl">
         <MapComponent />
      </Container>
      <Container size="xl" mb="xl">
        <ContactSection />
      </Container>
    </>
  );
}