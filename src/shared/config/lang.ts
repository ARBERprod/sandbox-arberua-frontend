export enum Language {
  UKRAINIAN = 'uk',
  RUSSIAN = 'ru',
  ENGLISH = 'en',
}

export const LANG_COOKIE_KEY = 'slang';

export const i18n_NAMESPACES = [
  'common',
  'about-page',
  'bonuses',
  'collections',
  'checkout-page',
  'certificates',
  'contacts-page',
  'main-page',
  'office-page',
  'product-card',
  'sizes',
  'vacancy-page',
];

export const LANG_DIALECT_MAP: Record<Language, string> = {
  [Language.RUSSIAN]: 'ru-Ru',
  [Language.UKRAINIAN]: 'uk-UA',
  [Language.ENGLISH]: 'en-US',
};

export const locales: Language[] = [Language.UKRAINIAN, Language.RUSSIAN, Language.ENGLISH];
