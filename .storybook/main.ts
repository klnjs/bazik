import type { StorybookConfig } from '@storybook/react-webpack5'
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
	stories: ['../packages/**/*.stories.tsx'],
	addons: ['@storybook/addon-essentials'],
	framework: '@storybook/react-webpack5',
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldRemoveUndefinedFromOptional: true,
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
		}
	},
	docs: {
		autodocs: true
	},
	core: {
		disableTelemetry: true
	},
	webpackFinal: (config) => {
		config.plugins?.push(
			new VanillaExtractPlugin(),
			new MiniCssExtractPlugin()
		)

		config.module?.rules?.forEach((rule) => {
			if (
				typeof rule !== 'string' &&
				rule.test instanceof RegExp &&
				rule.test.test('test.css')
			) {
				rule.exclude = /\.vanilla\.css$/i
			}
		})

		config.module?.rules?.push({
			test: /\.vanilla\.css$/i,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						url: false
					}
				}
			]
		})

		return config
	}
} satisfies StorybookConfig
