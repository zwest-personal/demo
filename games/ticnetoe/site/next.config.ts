import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, context) => {
    // If set, use polling to check for file changes
    // This is to deal with Docker file changes not triggering the typcial FS notices
    if (process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300
      }
    }
    return config
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig