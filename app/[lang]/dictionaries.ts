import "server-only";
import type pt from "./dictionaries/pt.json";
import type { Locale } from "./locales";

export type Dictionary = typeof pt;

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default as Dictionary),
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
  es: () => import("./dictionaries/es.json").then((m) => m.default as Dictionary),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
