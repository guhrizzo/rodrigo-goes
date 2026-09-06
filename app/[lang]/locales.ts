export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en", es: "es" };

export const localeNames: Record<Locale, string> = { pt: "PT", en: "EN", es: "ES" };

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);
