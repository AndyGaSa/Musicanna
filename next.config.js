/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'yt3.googleusercontent.com'],
  },
  i18n: {
    locales: ['ca', 'en', 'es', 'fr'],
    defaultLocale: 'ca',
    localeDetection: false,
  },
};
