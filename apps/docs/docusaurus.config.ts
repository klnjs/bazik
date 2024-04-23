import type { Config } from '@docusaurus/types'
import prismDark from './src/css/prism-dark'
import prismLight from './src/css/prism-light'

export default {
	title: 'Basique',
	tagline: 'Basique is cool',
	favicon: 'img/favicon.ico',

	url: 'https://klnjs.github.io',
	baseUrl: '/basique/',
	trailingSlash: false,
	projectName: 'basique',
	organizationName: 'klnjs',
	deploymentBranch: 'gh-pages',

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	i18n: {
		defaultLocale: 'en',
		locales: ['en']
	},

	themes: [
		[
			'@docusaurus/theme-classic',
			{
				customCss: ['./src/css/custom.css']
			}
		]
	],

	plugins: [
		[
			'@docusaurus/plugin-content-docs',
			{
				path: 'src/docs',
				sidebarPath: './sidebars.ts'
			}
		],
		['@docusaurus/plugin-content-pages', { path: 'src/pages' }]
	],

	themeConfig: {
		navbar: {
			title: 'Basique',
			logo: {
				alt: 'Basique logo',
				src: 'img/logo-glyph.svg'
			},
			items: [
				{
					type: 'doc',
					docId: 'overview/introduction',
					label: 'Docs',
					position: 'right'
				},
				{
					href: 'https://github.com/klnjs/basique',
					position: 'right',
					className: 'navbar__github-link',
					'aria-label': 'GitHub repository'
				}
			]
		},
		footer: {
			style: 'dark',
			copyright: `Copyright © ${new Date().getFullYear()} Basique, Inc. Built with Docusaurus.`
		},
		prism: {
			theme: prismLight,
			darkTheme: prismDark,
			additionalLanguages: ['bash']
		},
		colorMode: {
			defaultMode: 'dark',
			disableSwitch: false,
			respectPrefersColorScheme: true
		}
	}
} satisfies Config
