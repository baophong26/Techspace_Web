/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/bp-techspace',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bp-techspace/',
        basePath: false,
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*',
      },
    ];
  },
};

export default nextConfig;
