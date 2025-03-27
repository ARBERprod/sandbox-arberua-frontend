import { Price } from '@/shared/types/common';
import { randomNumber } from '@/shared/lib/utils/rnd';

export const getMockPrice = ():Price => ({
  symbol: 'грн',
  value: randomNumber(1000, 6000),
});
