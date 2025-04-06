import { Container } from '@mantine/core';
import { setRequestLocale } from 'next-intl/server';
import { MapComponent } from '@/components/Shared/MapComponent';
import { HeroSection } from '@/components/Home/HeroSection';
import { ServicesSection } from '@/components/Home/ServicesSection';
import { ContactSection } from '@/components/Contact/ContactSection';
import { WhyUsSection } from '@/components/Home/WhyUsSection';
import { FaqSection } from '@/components/Home/FaqSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <FaqSection />
      <Container size="xl" id="map" my="xl">
         <MapComponent />
      </Container>
      <Container size="xl" mb="xl">
        <ContactSection />
      </Container>
    </>
  );
}