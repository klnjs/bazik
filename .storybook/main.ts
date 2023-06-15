import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { mergeConfig } from 'vite'

export default {
	framework: '@storybook/react-vite',
	addons: ['@storybook/addon-essentials'],
	stories: ['../packages/**/*.stories.tsx'],
	core: {
		disableTelemetry: true,
		builder: '@storybook/builder-vite'
	},
	docs: {
		autodocs: true
	},
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldRemoveUndefinedFromOptional: true,
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
		}
	},
	viteFinal: async (config) =>
		mergeConfig(config, {
			plugins: [vanillaExtractPlugin()]
		})
} satisfies StorybookConfig
