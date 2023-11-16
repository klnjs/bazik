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
	addons: [
		{
			name: '@storybook/addon-storysource',
			options: {
				loaderOptions: {
					parser: 'typescript',
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
				prop.parent
					? !prop.parent.fileName.includes('node_modules')
					: true
		}
	},
	viteFinal: async (config) =>
		mergeConfig(config, {
			plugins: [vanillaExtractPlugin()]
		})
} satisfies StorybookConfig
