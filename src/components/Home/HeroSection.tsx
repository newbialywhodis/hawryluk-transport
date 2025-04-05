import { Button, Container, Group, Text, Box } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import classes from './HeroSection.module.css';
import { IconPhone } from '@tabler/icons-react';

export async function HeroSection() {
  const t = await getTranslations('HomePage');
  const tContact = await getTranslations('ContactDetails');
  const tHeader = await getTranslations('Header');
  const tHero = await getTranslations('HeroSection');

  const phoneNumber = tContact('phone');

  return (
    <Box className={classes.wrapper}>
      <Container size={750} className={classes.inner}>
        <h1 className={classes.title}>
          {tHero('mainTitle')}
          <Text component="span" className={classes.gradientText} inherit ml="md">
             {tHero('gradientSubtitle')}
          </Text>{' '}
          - {tHeader('companyName')}
        </h1>

        <Text className={classes.description} c="dimmed">
          {t('welcomeText')}
        </Text>

        <Group className={classes.controls}>
          <Button
            size="lg"
            className={classes.control}
            variant="gradient"
            component="a"
            href="#contact"
          >
            {t('contactButton')}
          </Button>

          <Button
            component="a"
            href={`tel:${phoneNumber.replace(/\s|\+/g, '')}`}
            size="lg"
            variant="default"
            className={classes.control}
            leftSection={<IconPhone size={20} />}
          >
            {tHero('callButton')}
          </Button>
        </Group>
      </Container>
    </Box>
  );
}