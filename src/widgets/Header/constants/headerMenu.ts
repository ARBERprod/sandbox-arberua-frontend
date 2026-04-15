import { routerPaths } from '@/shared/config/router';
import { TFunction } from 'next-i18next';
import { MenuLink, MenuView } from '../model/types';

type headerMenuGetter=(t:TFunction) =>MenuLink[]

export const headerMenuInfoMocked: headerMenuGetter = (t:TFunction) => [
  {
    title: t('menu.size-charts'),
    url: routerPaths.sizes,
    children: false,
    button: false,
  },
  {
    title: t('menu.loyalty-program'),
    url: routerPaths.bonuses,
    children: false,
    button: false,
  },
  {
    title: t('menu.gift-certificates'),
    url: routerPaths.certificates,
    children: false,
    button: false,
  },
  {
    title: t('menu.blog'),
    url: routerPaths.blog(),
    children: false,
    button: false,
  },
  {
    title: t('menu.contacts'),
    url: routerPaths.contacts,
    children: false,
    button: false,
  },
  {
    title: t('menu.faq'),
    url: routerPaths.faq,
    children: false,
    button: false,
  },
];

export const headerMenuMainMocked: headerMenuGetter = (t:TFunction) => [
  {
    id: '1',
    title: t('main-page:new_arrivals', { ns: 'main-page', defaultValue: 'New Arrivals' }),
    url: routerPaths.new_arrivals,
    children: false,
    button: false,
  },
  {
    id: '2',
    title: t('menu.catalog'),
    url: '',
    children: false,
    button: MenuView.CATALOG,
  },
  {
    id: '3',
    title: t('menu.collections'),
    url: routerPaths.collections(),
    children: false,
    button: false,
  },
  {
    id: '4',
    title: t('menu.total-look'),
    url: routerPaths.total_look_catalog(),
    children: false,
    button: false,
  },
  {
    id: '4.5',
    title: 'Sale',
    url: routerPaths.sale,
    children: false,
    button: false,
  },
  {
    id: '5',
    title: t('menu.promotions-offers'),
    url: routerPaths.promotions,
    children: false,
    button: false,
  },
  {
    id: '6',
    title: t('menu.stores'),
    url: routerPaths.shops,
    children: false,
    button: false,
  },
  {
    id: '7',
    title: t('menu.about-brand'),
    url: routerPaths.about,
    children: false,
    button: false,
  },
  {
    id: '8',
    title: t('menu.Info'),
    url: '',
    children: false,
    button: MenuView.INFO,
  },
];

export const headerMenuMainMocked2: MenuLink[] = [
  {
    title: 'About brand',
    url: routerPaths.about,
    children: false,
    button: false,
  },
  {
    title: 'Stores',
    url: routerPaths.shops,
    children: false,
    button: false,
  },
  {
    title: 'Catalog',
    url: '',
    children: false,
    button: MenuView.CATALOG,
  },
  {
    title: 'Collections',
    url: routerPaths.collections_catalog(''),
    children: false,
    button: false,
  },
  {
    title: 'Promotions',
    url: routerPaths.promotions,
    children: false,
    button: false,
  },
  {
    title: 'Total-look',
    url: routerPaths.total_look_catalog(),
    children: false,
    button: false,
  },
  {
    title: 'Blog',
    url: routerPaths.blog(),
    children: false,
    button: false,
  },
  {
    title: 'Info',
    url: '',
    children: false,
    button: MenuView.INFO,
  },
  {
    title: 'Contacts',
    url: routerPaths.contacts,
    children: false,
    button: false,
  },
];
