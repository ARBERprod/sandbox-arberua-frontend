import 'i18next';
import common from '../../../public/locales/uk/common.json';
import mainPage from '../../../public/locales/uk/main-page.json';
import aboutPage from '../../../public/locales/uk/about-page.json';
import vacancyPage from '../../../public/locales/uk/vacancy-page.json';
import contactsPage from '../../../public/locales/uk/contacts-page.json';
import productCard from '../../../public/locales/uk/product-card.json';
import sizesPage from '../../../public/locales/uk/sizes.json';
import officePage from '../../../public/locales/uk/office-page.json';
import checkoutPage from '../../../public/locales/uk/checkout-page.json';
import bonuses from '../../../public/locales/uk/bonuses.json';
import certificates from '../../../public/locales/uk/certificates.json';
import consultations from '../../../public/locales/uk/consultations.json';
import collections from '../../../public/locales/uk/collections.json';
import faq from '../../../public/locales/uk/faq.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      'main-page': typeof mainPage;
      'about-page': typeof aboutPage;
      'sizes': typeof sizesPage;
      'vacancy-page': typeof vacancyPage;
      'contacts-page': typeof contactsPage;
      'product-card': typeof productCard;
      'office-page': typeof officePage;
      'checkout-page': typeof checkoutPage;
      'bonuses': typeof bonuses;
      'certificates': typeof certificates;
      'consultations': typeof consultations;
      'collections': typeof collections;
      'faq': typeof faq;
    };
  }
}
