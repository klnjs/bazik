import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'

export default {
	title: 'My Site',
	tagline: 'Dinosaurs are cool',
	favicon: 'img/favicon.ico',

	url: 'https://your-docusaurus-site.example.com',
	baseUrl: '/',

	organizationName: 'klnjs', // Usually your GitHub org/user name.
	projectName: 'freya', // Usually your repo name.

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
			{ path: 'src/docs', sidebarPath: './sidebars.ts' }
		],
		['@docusaurus/plugin-content-pages', { path: 'src/pages' }]
	],

	themeConfig: {
		image: 'img/docusaurus-social-card.jpg',
		navbar: {
			hideOnScroll: true,
			title: 'My Site',
			logo: {
				alt: 'My Site Logo',
				src: 'img/logo.svg'
			},
			items: [
				{
					type: 'doc',
					docId: 'intro',
					label: 'Docs',
					position: 'right'
				},
				{
					href: 'https://github.com/facebook/docusaurus',
					position: 'right',
					className: 'navbar__github-link',
					'aria-label': 'GitHub repository'
				}
			]
		},
		footer: {
			style: 'dark',
			copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula
		},
		colorMode: {
			defaultMode: 'dark',
			disableSwitch: false,
			respectPrefersColorScheme: true
		}
	}
} satisfies Config
