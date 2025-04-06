import { Accordion, Container, Title, AccordionItem, AccordionControl, AccordionPanel } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

export async function FaqSection() {
  const t = await getTranslations('FaqSection');

  const faqItems = [
    { value: 'q1', qKey: 'q1', aKey: 'a1' },
    { value: 'q2', qKey: 'q2', aKey: 'a2' },
    { value: 'q3', qKey: 'q3', aKey: 'a3' },
    { value: 'q4', qKey: 'q4', aKey: 'a4' },
  ];

  return (
    <Container size="sm" py="xl">
      <Title ta="center" mb="xl">
        {t('title')}
      </Title>
      <Accordion
        variant="separated"
        radius="md"
        defaultValue={faqItems[0]?.value}
      >
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionControl>{t(item.qKey)}</AccordionControl>
            <AccordionPanel>{t(item.aKey)}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}