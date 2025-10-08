/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/.well-known/matrix/:path*',
                headers: [
                    { key: 'Content-Type', value: 'application/json' },
                    { key: 'Access-Control-Allow-Origin', value: '*' }
                ]
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: '/.well-known/matrix/server',
                destination: '/api/.well-known/matrix/server',
            },
            {
                source: '/.well-known/matrix/client',
                destination: '/api/.well-known/matrix/client',
            },
        ];
    }
};

export default nextConfig;
