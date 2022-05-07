module.exports = {
  images: {
    domains: ['raw.githubusercontent.com', 'cdn.traction.one'],
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
