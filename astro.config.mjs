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
				baseUrl: "https://github.com/feeeedox/timolia-howto/tree/main",
			},
			sidebar: [
				'about',
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
	build: {
		inlineStylesheets: "always",
	},
});
