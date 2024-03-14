import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { mergeConfig } from 'vite'

export default {
	stories: ['../packages/**/*.stories.tsx'],
	core: {
		disableTelemetry: true
	},
	framework: {
		name: '@storybook/react-vite',
		options: {
			strictMode: false
		}
	},
	addons: ['@storybook/addon-storysource', '@storybook/addon-a11y'],
	viteFinal: async (config) =>
		mergeConfig(config, {
			plugins: [vanillaExtractPlugin()]
		})
} satisfies StorybookConfig
