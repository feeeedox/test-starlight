// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Timolia HowTo',
			defaultLocale: 'root',
			locales: {
				root: {
					label: "Deutsch",
					lang: "de"
				},
				en: {
					label: "English"
				}
			},
			components: {
				PageFrame: "./src/components/overrides/PageFrame.astro",
				LastUpdated: "./src/components/overrides/LastUpdated.astro",
				Footer: "./src/components/overrides/Footer.astro",
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			lastUpdated: true,
			editLink: {
				baseUrl: "https://github.com/feeeedox/test-starlight/tree/main",
			},
			customCss: [
				"./src/styles/custom.css",
				"./src/styles/ranks.css"
			],
			sidebar: [
				'about',
				{
					label: 'Allgemein',
					translations: {
						en: "General"
					},
					autogenerate: { directory: 'general' },
				},
				{
					label: 'Das Regelwerk',
					translations: {
						en: "Rules"
					},
					autogenerate: { directory: 'rules' },
				},
				{
					label: 'Games',
					translations: {
						en: "Games"
					},
					autogenerate: { directory: 'games' },
				},
			],
		}),
	],
	build: {
		inlineStylesheets: "always",
	},
});
