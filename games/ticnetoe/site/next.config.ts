import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // WSL + Docker hot reload
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 300
    }
    return config
  },
  // Doesn't seem to play nice with Docker+WSL env
  // experimental: {
  //   turbo: {
  //     rules: {
  //       '*.svg': {
  //         loaders: ['@svgr/webpack'],
  //         as: '*.js',
  //       },
  //     },
  //   },
  // },
};

export default nextConfig