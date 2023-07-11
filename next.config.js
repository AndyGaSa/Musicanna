/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'yt3.googleusercontent.com'],
  },
  i18n: {
    locales: ['ca', 'en', 'es'],
    defaultLocale: 'ca',
  },
};
