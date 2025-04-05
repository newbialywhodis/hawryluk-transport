import 'mantine-flagpack/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { AppShellClientWrapper } from '@/components/Layout/AppShellClientWrapper';
import { theme } from '@/theme';
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Notifications } from '@mantine/notifications';

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) { return { title: "Invalid Locale" }; }
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const domain = 'http://localhost:3000';
  return {
    metadataBase: new URL(domain),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      url: `${domain}/${locale}`,
      siteName: t('title'),
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pl-PL': '/pl',
        'en-US': '/en',
        'x-default': `/${routing.defaultLocale}`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const tContact = await getTranslations({locale, namespace: 'ContactDetails'});
  const tSchema = await getTranslations({locale, namespace: 'Schema'});
  const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": tSchema('companyName'),
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Gościeszyn 23/7",
            "addressLocality": "Gościeszyn",
            "postalCode": "64-200",
            "addressCountry": "PL"
        },
        "telephone": "+48604402917",
        "identifier": [
            { "@type": "PropertyValue", "name": "NIP", "value": tContact('nip') },
            { "@type": "PropertyValue", "name": "REGON", "value": tContact('regon') }
        ],
        "url": `http://localhost:3000/${locale}`,
        "paymentAccepted": tSchema('paymentAccepted'),
        "areaServed": {
            "@type": "Place",
            "name": locale === 'pl' ? "Unia Europejska" : "European Union"
        }
   };


  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
         <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <Notifications position="top-right" />
            <AppShellClientWrapper>
              {children}
            </AppShellClientWrapper>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}