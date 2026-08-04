const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "overseas.technocitysolutions.com",
        pathname:
          "/public/uploads/destination/**",
      },
      {
        protocol: "https",
        hostname:
          "overseas.technocitysolutions.com",
        pathname: "/public/images/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;