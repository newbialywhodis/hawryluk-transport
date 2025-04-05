import { Container } from '@mantine/core';
import { setRequestLocale } from 'next-intl/server';
import { MapComponent } from '@/components/Shared/MapComponent';
import { HeroSection } from '@/components/Home/HeroSection';
import { ServicesSection } from '@/components/Home/ServicesSection';
import { ContactSection } from '@/components/Contact/ContactSection';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  setRequestLocale(locale);

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