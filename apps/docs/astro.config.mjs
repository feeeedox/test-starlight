// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: "Timolia HowTo",
      logo: {
        src: "./src/assets/logo.png", // Pfad zu deiner Datei
        alt: "Timolia Logo",
        replacesTitle: false, // true = Titel verschwindet, false = Logo + Titel
      },
      favicon: "favicon.png",
      description:
        "Timolia HowTo - Alle Informationen rund um die Timolia-Community",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Deutsch",
          lang: "de",
        },
        en: {
          label: "English",
        },
      },
      components: {
        PageFrame: "./src/components/overrides/PageFrame.astro",
        LastUpdated: "./src/components/overrides/LastUpdated.astro",
        ThemeSelect: "./src/components/overrides/ThemeSwitcher.astro",
        Footer: "./src/components/overrides/Footer.astro",
        LanguageSelect: "./src/components/overrides/LanguageSwitcher.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/feeeedox/test-starlight/tree/main",
      },
      customCss: ["./src/styles/custom.css", "./src/styles/ranks.css"],
      sidebar: [
        "index",
        {
          label: "Allgemein",
          translations: {
            en: "General",
          },
          autogenerate: { directory: "general" },
        },
        {
          label: "Das Regelwerk",
          collapsed: true,
          translations: {
            en: "Rules",
          },
          autogenerate: { directory: "rules" },
        },
        {
          label: "Unsere Spiele",
          collapsed: true,
          translations: {
            en: "Games",
          },
          autogenerate: { directory: "games" },
        },
        {
          label: "Ränge auf Timolia",
          collapsed: true,
          translations: {
            en: "Ranks on Timolia",
          },
          autogenerate: { directory: "ranks" },
        },
        {
          label: "Das Timolia-Team",
          collapsed: true,
          translations: {
            en: "The Timolia Team",
          },
          autogenerate: { directory: "team" },
        },
      ],
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
});
