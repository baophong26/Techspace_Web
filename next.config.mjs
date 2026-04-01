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
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${backendUrl}/:path*`, // Proxy to Backend securely
        },
      ]
    };
  },
};

export default nextConfig;
