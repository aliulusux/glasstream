/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "i.ytimg.com" }
    ]
  }
};
