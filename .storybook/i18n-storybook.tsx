import { appWithTranslation } from 'next-i18next';
import { StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

const ns = ['common', 'sizes', 'about-page', 'contacts-page', 'vacancy-page', 'product-card'];
const locales = ['uk', 'ru'];

const resources = ns.reduce((acc: Record<string, object>, n) => {
  locales.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      // eslint-disable-next-line global-require, import/no-dynamic-require
      [n]: require(`../public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

export default (Story: StoryFn, context: any) => {
  const [locale, setLocale] = useState('uk');

  const _nextI18Next = {
    ns,
    initialLocale: locale,
    initialI18nStore: {
      [locale]: {
        ...resources[locale],
      },
    },
    userConfig: {
      resources,
      default: {
        defaultNS: 'common',
        i18n: {
          defaultLocale: "uk",
          locales
        }
      },
      i18n: {
        locales,
        defaultLocale: locale || 'uk',
      },
    },
  };
  const { globals } = context;
  useEffect(() => {
    setLocale(globals.locale);
  }, [globals.locale]);

  const AppWithTranslation = appWithTranslation(Story);

  return (
    // @ts-ignore
    <AppWithTranslation
      pageProps={{
        _nextI18Next,
      }}
    />
  );
};
