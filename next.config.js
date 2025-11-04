/** @type {import('next').NextConfig} */
/*const nextConfig = {
  output: "standalone", // ✅ not "export"
  experimental: {
    serverActions: false,

    },  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/r/**",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
        pathname: "/s/common/uploaded_files/**",
      },
      {
        protocol: "https",
        hostname: "api.jikan.moe",
      },  
    ],
  },
  generateEtags: false,
  reactStrictMode: false,
};

module.exports = nextConfig;*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: { serverActions: false },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "cdn.myanimelist.net", pathname: "/r/**" },
      { protocol: "https", hostname: "cdn.myanimelist.net", pathname: "/images/**" }
    ]
  },
  reactStrictMode: false
};
module.exports = nextConfig;

