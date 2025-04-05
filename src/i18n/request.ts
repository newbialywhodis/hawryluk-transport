import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }): Promise<{locale: string, messages: AbstractIntlMessages}> => {
  let requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Opcjonalnie: zwróć 404 dla niepoprawnego locale w URL
  // if (!hasLocale(routing.locales, requested)) {
  //   notFound();
  // }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});