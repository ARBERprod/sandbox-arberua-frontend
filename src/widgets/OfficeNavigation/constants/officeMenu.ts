import { routerPaths } from '@/shared/config/router';
import { SvgType } from '@/shared/types/common';
import ExitIcon from '@/shared/assets/icons/go-out.svg';
import { TFunction } from 'i18next';

export interface OfficeMenuItem {
  label: string;
  href: string;
  Icon?: SvgType;
}

export const officeMenu: (t: TFunction<'office-page'>) => OfficeMenuItem[] = (t) => [
  {
    label: t('my_data'),
    href: routerPaths.office,
  },
  {
    label: t('orders'),
    href: routerPaths.office_orders,
  },
  {
    label: t('my_feedback'),
    href: routerPaths.office_reviews,
  },
  {
    label: t('viewed'),
    href: routerPaths.office_viewed,
  },
  {
    label: t('wishlist'),
    href: routerPaths.office_wishlist,
  },
  {
    label: t('bonuses'),
    href: routerPaths.office_bonuses,
  },
  {
    label: t('consultations'),
    href: routerPaths.office_consultations,
  },
  {
    label: t('feedback'),
    href: routerPaths.office_feedback,
  },
  {
    label: t('exit'),
    href: routerPaths.logout,
    Icon: ExitIcon,
  },

];
