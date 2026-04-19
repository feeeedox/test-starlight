#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Teamler } from './teamler.js';
import { Translations } from './translations.js';
import { updateTeamlerNames } from './mojang.js';
import { generateMembersPage } from './generators/members.js';
import { generateChangesPage } from './generators/changes.js';
import { generateResponsibilitiesPage } from './generators/responsibilities.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Main generator function
 */
async function generateTeamPages(config) {
    console.log('🚀 Timolia Team Page Generator\n');

    console.log('📖 Loading teamler data...');
    const teamlerData = JSON.parse(readFileSync(config.teamlerJsonPath, 'utf-8'));
    const teamlers = teamlerData.map(data => new Teamler(data));
    console.log(`✅ Loaded ${teamlers.length} team members\n`);

    if (config.updateNames) {
        console.log('🔄 Updating player names from Mojang API...');
        await updateTeamlerNames(teamlers);
        console.log('✅ Name update complete\n');
    }

    console.log('🌍 Loading translations...');
    const translations = new Translations();
    translations.load(config.translationsPath);
    console.log('✅ Translations loaded\n');

    console.log('📝 Generating pages...');

    const pages = [
        { name: 'members', generator: generateMembersPage },
        { name: 'changes', generator: generateChangesPage },
        { name: 'responsibilities', generator: generateResponsibilitiesPage }
    ];

    for (const page of pages) {
        console.log(`  - Generating ${page.name}...`);
        const content = page.generator(teamlers);

        for (const lang of ['de', 'en']) {
            const translatedContent = translations.replaceAll(content, lang);

            let outputPath;
            if (lang === 'de') {
                outputPath = join(config.outputPath, 'team', `${page.name}.mdx`);
            } else {
                outputPath = join(config.outputPath, 'en', 'team', `${page.name}.mdx`);
            }

            mkdirSync(dirname(outputPath), { recursive: true });

            const frontmatter = generateFrontmatter(page.name, lang);
            const fullContent = `${frontmatter}\n${translatedContent}`;

            writeFileSync(outputPath, fullContent, 'utf-8');

            if (lang === 'de') {
                console.log(`    ✓ team/${page.name}.mdx`);
            } else {
                console.log(`    ✓ en/team/${page.name}.mdx`);
            }
        }
    }

    console.log('\n✨ Generation complete!\n');
    console.log(`📁 Output directory: ${config.outputPath}`);
    console.log('🎉 All team pages have been generated successfully!');
}

/**
 * Generate frontmatter for Starlight MDX files
 */
function generateFrontmatter(pageName, language) {
    const titles = {
        members: { de: 'Teammitglieder', en: 'Team Members' },
        changes: { de: 'Team-Änderungen', en: 'Team Changes' },
        responsibilities: { de: 'Verantwortlichkeiten', en: 'Responsibilities' }
    };

    const descriptions = {
        members: {
            de: 'Übersicht aller Timolia Teammitglieder mit ihren Rängen und Verantwortlichkeiten',
            en: 'Overview of all Timolia team members with their ranks and responsibilities'
        },
        changes: {
            de: 'Chronologische Auflistung aller Team-Änderungen, Beförderungen und Degradierungen',
            en: 'Chronological list of all team changes, promotions and demotions'
        },
        responsibilities: {
            de: 'Detaillierte Übersicht der Aufgabenbereiche und Zuständigkeiten im Team',
            en: 'Detailed overview of areas of responsibility and assignments in the team'
        }
    };

    return `---
title: ${titles[pageName][language]}
description: ${descriptions[pageName][language]}
---`;
}

/**
 * Parse command line arguments
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const config = {
        teamlerJsonPath: join(process.cwd(), 'teamler.json'),
        translationsPath: join(process.cwd(), 'translations'),
        outputPath: join(process.cwd(), 'output'),
        updateNames: true
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--input' || arg === '-i') {
            config.teamlerJsonPath = args[++i];
        } else if (arg === '--translations' || arg === '-t') {
            config.translationsPath = args[++i];
        } else if (arg === '--output' || arg === '-o') {
            config.outputPath = args[++i];
        } else if (arg === '--no-update-names') {
            config.updateNames = false;
        } else if (arg === '--help' || arg === '-h') {
            console.log(`
Timolia Team Page Generator

Usage: node src/index.js [options]

Options:
  -i, --input <path>         Path to teamler.json (default: ./teamler.json)
  -t, --translations <path>  Path to translations directory (default: ./translations)
  -o, --output <path>        Path to output directory (default: ./output)
  --no-update-names          Skip updating player names from Mojang API
  -h, --help                 Show this help message

Examples:
  node src/index.js
  node src/index.js --input ./data/teamler.json --output ./dist
  node src/index.js --no-update-names
      `);
            process.exit(0);
        }
    }

    return config;
}

// Run the generator
const config = parseArgs();
generateTeamPages(config).catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
});