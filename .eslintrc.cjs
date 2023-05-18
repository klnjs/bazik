module.exports = {
	extends: [
		'@klnjs/eslint-config',
		'@klnjs/eslint-config-react',
		'@klnjs/eslint-config-typescript'
	],
	env: {
		node: true
	},
	rules: {
		'no-console': 'off'
	}
}
