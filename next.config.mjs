/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/gallery',
        destination: '/templates',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
