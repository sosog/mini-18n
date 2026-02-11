import { Translations, Variables, TranslatorOptions, PluralOptions } from './types';

export class Translator {
    private locale: string;
    private translations: Record<string, Translations>;
    private fallbackLocale?: string;

    constructor(options: TranslatorOptions) {
        this.locale = options.locale;
        this.translations = options.translations;
        this.fallbackLocale = options.fallbackLocale;
    }

    public t(key: string, variables?: Variables): string {
        let lookupKey = key;

        // Simple pluralization: if count is provided and not 1, look for _plural key
        if (variables && typeof variables.count === 'number' && variables.count !== 1) {
            const pluralKey = `${key}_plural`;
            if (this.getTranslation(this.locale, pluralKey) || (this.fallbackLocale && this.getTranslation(this.fallbackLocale, pluralKey))) {
                lookupKey = pluralKey;
            }
        }

        let template = this.getTranslation(this.locale, lookupKey);

        if (!template && this.fallbackLocale) {
            template = this.getTranslation(this.fallbackLocale, lookupKey);
        }

        if (!template) {
            // Fallback to original key if translation missing
            return key;
        }

        return this.interpolate(template, variables);
    }

    public plural(count: number, options: Omit<PluralOptions, 'count'>): string {
        const vars: Variables = { count, ...options };
        let template = options.other;

        if (count === 0 && options.zero) {
            template = options.zero;
        } else if (count === 1) {
            template = options.one;
        }

        return this.interpolate(template, vars);
    }

    public setLocale(locale: string): void {
        this.locale = locale;
    }

    public getLocale(): string {
        return this.locale;
    }

    private getTranslation(locale: string, key: string): string | null {
        const keys = key.split('.');
        let current: any = this.translations[locale];

        for (const k of keys) {
            if (current && typeof current === 'object' && k in current) {
                current = current[k];
            } else {
                return null;
            }
        }

        return typeof current === 'string' ? current : null;
    }

    private interpolate(template: string, variables?: Variables): string {
        if (!variables) {
            return template;
        }

        return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
            const value = variables[key];
            if (value === undefined || value === null) {
                return `{{${key}}}`;
            }
            return String(value);
        });
    }

    /**
     * Auto-translate all elements with data-i18n attribute
     */
    public autoTranslate(): void {
        if (typeof document === 'undefined') return;

        // Handle standard text translations (safe)
        document.querySelectorAll('[data-i18n]').forEach((el: Element) => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;

            const varsAttr = el.getAttribute('data-i18n-vars');
            const variables = varsAttr ? JSON.parse(varsAttr) : undefined;

            (el as HTMLElement).textContent = this.t(key, variables);
        });

        // Handle HTML translations
        document.querySelectorAll('[data-i18n-html]').forEach((el: Element) => {
            const key = el.getAttribute('data-i18n-html');
            if (!key) return;

            const varsAttr = el.getAttribute('data-i18n-vars');
            const variables = varsAttr ? JSON.parse(varsAttr) : undefined;

            (el as HTMLElement).innerHTML = this.t(key, variables);
        });
    }
}
