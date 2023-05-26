module.exports = {
	extends: [
		'@klnjs/eslint-config',
		'@klnjs/eslint-config-react',
		'@klnjs/eslint-config-typescript'
	],
	root: true,
	rules: {
		'import/order': [
			'error',
			{
				'new-lines-between': 'never'
			}
		]
	}
}
