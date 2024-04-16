/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['github.com', 'https://d2onhdkn7w90qy.cloudfront.net'],
  },
}

module.exports = nextConfig
