const {
  withSentryConfig,
} = require('@sentry/nextjs');
const {
  i18n,
} = require('./next-i18next.config');
const axios = require('axios');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  async redirects() {
    try {
      const { data: { data } } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_V2}/redirects`);
      const apiRedirects = data.map(({ source, destination }) => ({
        statusCode: 301,
        source,
        destination,
      }));

      return [...apiRedirects];
    } catch (e) {
      return [];
    }
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
        },
      }],
    });

    return config;
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '*',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: '*',
      port: '',
      pathname: '/**',
    },
    ],
  },
  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
