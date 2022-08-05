/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['milesr.dev', 'guardianbot.io']
  },
  // redirects() {
  //   return [
  //     process.env.MAINTENANCE_MODE === "true" ? { source: '/((?!maintenance).*)', destination: '/maintenance.html', permanent: false } : null,
  //   ].filter(Boolean);
  // }
}

module.exports = nextConfig
