import { Paper, Text, Box } from '@mantine/core';
import { getTranslations } from 'next-intl/server';
import { ContactInfoList } from './ContactInfoList';
import { ContactForm } from './ContactForm';
import classes from './ContactSection.module.css';

export async function ContactSection() {
  const t = await getTranslations('ContactSection');

  return (
    <Paper shadow="md" radius="lg" my="xl" id="contact">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            {t('infoTitle')}
          </Text>
          <ContactInfoList />
        </div>

        <div className={classes.form}>
          <Text fz="lg" fw={700} className={classes.title}>
            {t('formTitle')}
          </Text>
          <ContactForm />
        </div>
      </div>
    </Paper>
  );
}