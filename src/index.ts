import { Translator } from './translator';
import { Translations, TranslatorOptions } from './types';

export { Translator, Translations, TranslatorOptions };

export function createTranslator(locale: string, translations: Record<string, Translations>, options?: Partial<Omit<TranslatorOptions, 'locale' | 'translations'>>) {
    return new Translator({
        locale,
        translations,
        ...options
    });
}
