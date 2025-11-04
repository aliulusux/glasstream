/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    typedRoutes: false,
    serverActions: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  generateEtags: false,
  // 👇 Important: prevent invalid not-found SSR
  async redirects() {
    return [];
  },
};

module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net",},
      { protocol: "https", hostname: "upload.wikimedia.org",},
      { protocol: "https", hostname: "i.ytimg.com", },
      { protocol: "https", hostname: "**.jikan.moe",},
      { protocol: "https", hostname: "**.myanimelist.net",},
    ],
  },
};

module.exports = nextConfig;