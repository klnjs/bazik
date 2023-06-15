import eslintConfig from '@klnjs/eslint-config'
import eslintConfigReact from '@klnjs/eslint-config-react'
import eslintConfigTypescript from '@klnjs/eslint-config-typescript'

export default [
	eslintConfig,
	eslintConfigReact,
	eslintConfigTypescript,
	{
		files: ['**/*.stories.tsx'],
		rules: {
			'no-console': 'off'
		}
	}
]
