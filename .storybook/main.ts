import type { StorybookConfig } from '@storybook/nextjs';
const path = require('path');

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async config => {
		if (config?.resolve?.alias) {
			config.resolve.alias['@'] = path.resolve(__dirname, '../src');
		}

		config.resolve.fallback = {
			...config.resolve.fallback,
			querystring: false
		}

		const imageRule = config.module?.rules?.find(rule => {
			const test = (rule as { test: RegExp }).test;

			if (!test) {
				return false;
			}

			return test.test('.svg');
		}) as { [key: string]: any };

		imageRule.exclude = /\.svg$/;

		config.module?.rules?.push({
			test: /\.svg$/,
			use:  [{
				loader: '@svgr/webpack',
				options: {
					dimensions: false,
				},
			}],
		});

		return config;
	},
  webpack: (config) => {
    config.resolve.fallback.fs = false;
    return config;
  },
};

export default config;
