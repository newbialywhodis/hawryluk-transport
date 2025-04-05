import { Title, Paper, Box } from '@mantine/core';
import { useTranslations } from 'next-intl';

export function MapComponent() {
  const t = useTranslations('HomePage');

  const iframeHtml = `<iframe width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=16.20363771915436%2C52.091985930196955%2C16.20717823505402%2C52.09346245760533&amp;layer=mapnik" display: block;"></iframe>`;

  return (
    <Paper shadow="md" radius="md" withBorder>
      <Title order={3} ta="center" pt="lg" pb="md">{t('mapTitle')}</Title>
      <Box
         style={{ lineHeight: 0, borderBottomLeftRadius: 'var(--mantine-radius-md)', borderBottomRightRadius: 'var(--mantine-radius-md)', overflow: 'hidden' }}
         dangerouslySetInnerHTML={{ __html: iframeHtml }}
       />
    </Paper>
  );
}