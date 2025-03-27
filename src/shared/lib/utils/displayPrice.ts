import { Price } from '@/shared/types/common';

export const displayPrice = (price: Price | false | undefined | null) => {
  if (!price) return '';
  return `${price.value} ${price.symbol}`;
};
