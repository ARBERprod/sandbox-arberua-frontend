import { SocialLink } from '@/shared/types/common';
import ViberIcon from '@/shared/assets/icons/viber.svg';
import InstagramIcon from '@/shared/assets/icons/instagram.svg';
import TelegramIcon from '@/shared/assets/icons/telegram.svg';
import FacebookIcon from '@/shared/assets/icons/facebook.svg';

export const SOCIALS = {
  viber: {
    Icon: ViberIcon,
    href: 'https://tinyurl.com/bddk7txh',
    stroke: 'none',
    fill: 'black-light-2',
  },
  instagram: {
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/arber.ua/',
    stroke: 'none',
    fill: 'black-light-2',
  },
  telegram: {
    Icon: TelegramIcon,
    href: 'https://t.me/arber_ukraine_bot',
    stroke: 'none',
    fill: 'black-light-2',

  },
  facebook: {
    Icon: FacebookIcon,
    href: 'https://www.facebook.com/ArberStores',
    stroke: 'black-light-2',
    fill: 'black-light-2',
  },
} as const;

export const FOOTER_SOCIALS: SocialLink[] = [SOCIALS.facebook, SOCIALS.instagram];
export const HEADER_SOCIALS: SocialLink[] = [SOCIALS.viber, SOCIALS.instagram, SOCIALS.telegram, SOCIALS.facebook];
export const CONTACTS_SOCIALS: SocialLink[] = [SOCIALS.viber, SOCIALS.instagram, SOCIALS.telegram, SOCIALS.facebook];
