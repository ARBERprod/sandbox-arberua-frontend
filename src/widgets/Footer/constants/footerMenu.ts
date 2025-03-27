import { routerPaths } from '@/shared/config/router';
import { TFunction } from 'next-i18next';

type footerMenuGetter = (t: TFunction) => { title: string, url: string }[]

export const footerMenu1: footerMenuGetter = (t: TFunction) => ([
  {
    title: t('menu.about-brand'),
    url: routerPaths.about,
  },
  {
    title: t('menu.stores'),
    url: routerPaths.shops,
  },
  {
    title: t('menu.contacts'),
    url: routerPaths.contacts,
  },
]);

export const footerMenu2: footerMenuGetter = (t: TFunction) => ([
  {
    title: t('menu.size-charts'),
    url: routerPaths.sizes,
  },
  {
    title: t('menu.loyalty-program'),
    url: routerPaths.bonuses,
  },
  {
    title: t('menu.gift-certificates'),
    url: routerPaths.certificates,
  },
  {
    title: t('menu.promotions-offers'),
    url: routerPaths.promotions,
  },
  {
    title: t('menu.collections'),
    url: routerPaths.collections(),
  },
  {
    title: t('menu.total-look'),
    url: routerPaths.total_look_catalog(),
  },
  {
    title: t('menu.blog'),
    url: routerPaths.blog(),
  },
]);

export const footerMenu3: footerMenuGetter = (t: TFunction) => ([
  {
    title: t('menu.about-brand'),
    url: routerPaths.about,
  },
  {
    title: t('menu.stores'),
    url: routerPaths.shops,
  },
  {
    title: t('menu.collections'),
    url: routerPaths.collections(),
  },
  {
    title: t('menu.promotions-offers'),
    url: routerPaths.promotions,
  },
  {
    title: t('menu.outfit-builder'),
    url: routerPaths.look_constructor,
  },
  {
    title: t('menu.total-look'),
    url: routerPaths.total_look_catalog(),
  },
]);
