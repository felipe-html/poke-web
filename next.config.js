/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  },
}
