'use client';

import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Box, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { sendEmail } from '@/actions/sendEmail';
import { useState } from 'react';

export function ContactForm() {
  const t = useTranslations('ContactForm');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? t('validationRequired') : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('validationEmail')),
      message: (value) => (value.trim().length === 0 ? t('validationRequired') : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    const result = await sendEmail(values);
    setIsSubmitting(false);

    if (result.success) {
      notifications.show({
        title: t('sendSuccessTitle'),
        message: t('sendSuccessMessage'),
        color: 'teal',
        autoClose: 5000,
      });
      form.reset();
    } else {
      notifications.show({
        title: t('sendErrorTitle'),
        message: `${t('sendErrorMessage')} ${result.error ? `(${result.error})` : ''}`,
        color: 'red',
      });
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay visible={isSubmitting} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label={t('nameLabel')}
          placeholder={t('namePlaceholder')}
          required
          mb="md"
          {...form.getInputProps('name')}
        />
        <TextInput
          label={t('emailLabel')}
          placeholder={t('emailPlaceholder')}
          required
          type="email"
          mb="md"
          {...form.getInputProps('email')}
        />
        <Textarea
          label={t('messageLabel')}
          placeholder={t('messagePlaceholder')}
          required
          minRows={4}
          mb="lg"
          {...form.getInputProps('message')}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t('sending') : t('submitButton')}
        </Button>
      </form>
    </Box>
  );
}