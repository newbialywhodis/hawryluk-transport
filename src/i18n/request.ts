import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
// Usunięto import notFound
// import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }): Promise<{locale: string, messages: AbstractIntlMessages}> => {
  // Zmieniono let na const
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // if (!hasLocale(routing.locales, requested)) {
  //   notFound();
  // }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});