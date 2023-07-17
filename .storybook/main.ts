import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import prettierConfig from '@klnjs/prettier-config'
import { mergeConfig } from 'vite'

export default {
	framework: '@storybook/react-vite',
	stories: ['../packages/**/*.stories.tsx'],
	addons: [
		{
			name: '@storybook/addon-storysource',
			options: {
				loaderOptions: {
					parser: 'typescript',
					prettierConfig,
					injectStoryParameters: false
				}
			}
		}
	],
	core: {
		disableTelemetry: true,
		builder: '@storybook/builder-vite'
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
