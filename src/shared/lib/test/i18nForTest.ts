import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18n_NAMESPACES, locales } from '@/shared/config/lang';

const resources = i18n_NAMESPACES.reduce((acc: Resource, n) => {
  locales.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      // eslint-disable-next-line global-require, import/no-dynamic-require
      [n]: require(`../../../../public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

i18n
  .use(initReactI18next)
  .init({
    lng: 'uk',
    fallbackLng: 'uk',

    ns: ['common'],
    defaultNS: 'common',

    debug: false,
    resources,
  });
export default i18n;
