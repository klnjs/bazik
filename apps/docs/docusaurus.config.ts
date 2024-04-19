import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import prismDark from './src/css/prism-dark'
import prismLight from './src/css/prism-light'

export default {
	title: 'My Site',
	tagline: 'Dinosaurs are cool',
	favicon: 'img/favicon.ico',

	url: 'https://your-docusaurus-site.example.com',
	baseUrl: '/',

	organizationName: 'klnjs', // Usually your GitHub org/user name.
	projectName: 'bazik', // Usually your repo name.

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
			title: 'Bazik',
			logo: {
				alt: 'Bazik logo',
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
					href: 'https://github.com/klnjs/bazik',
					position: 'right',
					className: 'navbar__github-link',
					'aria-label': 'GitHub repository'
				}
			]
		},
		footer: {
			style: 'dark',
			copyright: `Copyright © ${new Date().getFullYear()} Bazik, Inc. Built with Docusaurus.`
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
