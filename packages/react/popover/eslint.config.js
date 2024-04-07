import { core, react, typescript } from '@klnjs/eslint-config'

export default [
	core,
	react,
	typescript,
	{
		ignores: ['dist']
	}
]
