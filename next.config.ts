import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // reactStrictMode: true, // Twoje opcje Next.js
};

export default withNextIntl(nextConfig);