import { core, typescript } from '@klnjs/eslint-config'

export default [
	core,
	typescript,
	{
		ignores: ['dist']
	}
]
