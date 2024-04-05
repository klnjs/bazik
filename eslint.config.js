import { core, react, typescript } from '@klnjs/eslint-config'
import globals from 'globals'

export default [
	core,
	react,
	typescript,
	{
		files: ['**/*.stories.tsx'],
		rules: {
			'no-console': 'off'
		}
	},
	{
		files: ['**/scripts/*.js', 'babel.config.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		rules: {
			'no-console': 'off'
		}
	}
]
