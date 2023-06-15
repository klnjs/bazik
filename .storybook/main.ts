import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { mergeConfig } from 'vite'

export default {
	stories: ['../packages/**/*.stories.tsx'],
	addons: ['@storybook/addon-essentials'],
	framework: '@storybook/react-vite',
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
	docs: {
		autodocs: true
	},
	core: {
		disableTelemetry: true,
		builder: '@storybook/builder-vite'
	},
	viteFinal: async (config) =>
		mergeConfig(config, {
			plugins: [vanillaExtractPlugin()]
		})
} satisfies StorybookConfig
