import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import prettierConfig from '@klnjs/prettier-config'
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
