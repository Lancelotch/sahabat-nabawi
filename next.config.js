/** @type {import('next').NextConfig} */

module.exports = () => {
  const publicRuntimeConfig = {
    basePublicApi: process.env.NEXT_PUBLIC_API,
  };

  return {
    publicRuntimeConfig,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*",
        },
      ],
    },
  };
};
