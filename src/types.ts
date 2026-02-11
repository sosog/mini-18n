export type Variables = Record<string, string | number | boolean | null | undefined>;

export type Translations = {
    [key: string]: string | Translations;
};

export interface TranslatorOptions {
    locale: string;
    translations: Record<string, Translations>;
    fallbackLocale?: string;
    debug?: boolean;
}

export interface PluralOptions {
    count: number;
    one: string;
    other: string;
    zero?: string;
    [key: string]: any;
}
