import InfoIcon from '@/shared/assets/icons/info.svg';
import TruckIcon from '@/shared/assets/icons/truck.svg';
import WalletIcon from '@/shared/assets/icons/wallet.svg';
import SettingIcon from '@/shared/assets/icons/setting-computer-2.svg';
import ReturnIcon from '@/shared/assets/icons/return.svg';
import CartIcon from '@/shared/assets/icons/cart2.svg';
import PercentIcon from '@/shared/assets/icons/circum-percent.svg';
import UserIcon from '@/shared/assets/icons/user1.svg';
import { FaqTab } from '../model/types/types';

export const mockedTabsButtons: FaqTab[] = [
  {
    picture: InfoIcon,
    title: 'Про Arber',
    id: 'FaqTypes.ABOUT',
    contents: [],
  }, {
    picture: TruckIcon,
    title: 'Отправка и доставка товара',
    id: 'FaqTypes.SHIPPING_DELIVERY',
    contents: [],
  }, {
    picture: WalletIcon,
    title: 'Оплата',
    id: 'FaqTypes.PAYMENT',
    contents: [],
  }, {
    picture: SettingIcon,
    title: 'Технические проблемы',
    id: 'FaqTypes.TECHNICAL_ISSUES',
    contents: [],
  }, {
    picture: ReturnIcon,
    title: 'Возвраты и рекламации',
    id: 'FaqTypes.RETURNS_CLAIMS',
    contents: [],
  }, {
    picture: CartIcon,
    title: 'Заказ',
    id: 'FaqTypes.ORDER',
    contents: [],
  }, {
    picture: PercentIcon,
    title: 'Промокоды',
    id: 'FaqTypes.PROMOCODE',
    contents: [],
  }, {
    picture: UserIcon,
    title: 'Регистрация',
    id: 'FaqTypes.REGISTRATION',
    contents: [],
  },
];

export const mockedTabsQuestions = {

};
