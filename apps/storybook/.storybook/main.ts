import type { StorybookConfig } from '@storybook/react-vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { join, dirname } from 'path'
import { mergeConfig } from 'vite'

export default {
	stories: ['../src/stories/**/*.stories.tsx'],
	core: {
		disableTelemetry: true
	},
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {
			strictMode: false
		}
	},
	addons: [getAbsolutePath('@storybook/addon-a11y')],
	viteFinal: async (config) =>
		mergeConfig(config, {
			plugins: [vanillaExtractPlugin()]
		})
} satisfies StorybookConfig

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')))
}
