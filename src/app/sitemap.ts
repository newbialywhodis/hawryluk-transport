import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:3000';

  const localePaths = routing.locales.map((locale: string) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }));

  return [
    ...localePaths,
  ];
}