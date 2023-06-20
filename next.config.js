/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'yt3.googleusercontent.com'],
  },
  i18n: {
    locales: ['cat', 'en', 'es'],
    defaultLocale: 'cat',
  },
};
