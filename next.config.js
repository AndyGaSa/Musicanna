/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const config = {
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

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(config);
