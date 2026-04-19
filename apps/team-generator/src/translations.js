import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Translation manager for loading and applying translations
 */
export class Translations {
    constructor() {
        this.translations = {
            de: {},
            en: {}
        };
    }

    /**
     * Load translations from .properties files
     */
    load(translationsDir) {
        const languages = ['de', 'en'];

        for (const lang of languages) {
            const filePath = join(translationsDir, `${lang}.properties`);

            try {
                const content = readFileSync(filePath, 'utf-8');
                this.translations[lang] = this.parseProperties(content);
                console.log(`Loaded ${Object.keys(this.translations[lang]).length} translations for ${lang}`);
            } catch (error) {
                console.warn(`Could not load translations for ${lang}:`, error.message);
            }
        }
    }

    /**
     * Parse .properties file content
     */
    parseProperties(content) {
        const translations = {};
        const lines = content.split('\n');
        let currentKey = null;
        let currentValue = '';

        for (let line of lines) {
            line = line.trim();

            if (!line || line.startsWith('#')) {
                continue;
            }

            if (currentKey && line.startsWith(' ')) {
                currentValue += ' ' + line.trim();
                continue;
            }

            if (currentKey) {
                translations[currentKey] = currentValue.replace(/\\\s*\n/g, '\n').trim();
            }

            const separatorIndex = line.indexOf('=');
            if (separatorIndex === -1) {
                continue;
            }

            currentKey = line.substring(0, separatorIndex).trim();
            currentValue = line.substring(separatorIndex + 1).trim();

            if (currentValue.endsWith('\\')) {
                currentValue = currentValue.slice(0, -1).trim();
            } else {
                translations[currentKey] = currentValue;
                currentKey = null;
                currentValue = '';
            }
        }

        if (currentKey) {
            translations[currentKey] = currentValue.replace(/\\\s*\n/g, '\n').trim();
        }

        return translations;
    }

    /**
     * Replace all translation placeholders in text
     */
    replaceAll(text, language = 'de') {
        const translations = this.translations[language] || this.translations['de'];

        // Replace %key% patterns
        return text.replace(/%([^%]+)%/g, (match, key) => {
            return translations[key] || match;
        });
    }

    /**
     * Get a specific translation
     */
    get(key, language = 'de') {
        const translations = this.translations[language] || this.translations['de'];
        return translations[key] || key;
    }
}