module.exports = {
	extends: [
		'@klnjs/eslint-config',
		'@klnjs/eslint-config-react',
		'@klnjs/eslint-config-typescript'
	],
	parserOptions: {
		project: './tsconfig.json'
	}
}
