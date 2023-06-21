import eslintConfig from '@klnjs/eslint-config'
import eslintConfigReact from '@klnjs/eslint-config-react'
import eslintConfigTypescript from '@klnjs/eslint-config-typescript'
import globals from 'globals'

export default [
	eslintConfig,
	eslintConfigReact,
	eslintConfigTypescript,
	{
		files: ['**/*.stories.tsx'],
		rules: {
			'no-console': 'off'
		}
	},
	{
		files: ['**/scripts/*.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	}
]
