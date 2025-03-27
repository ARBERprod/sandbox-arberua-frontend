import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { OrderDto } from '@/entities/Order';

export const SUCCESS_ORDER_RESPONSE: SuccessApiResponseWithMeta<OrderDto[]> = {
  success: true,
  data: [],
  meta: {
    page: {
      current: 1,
      total: 1,
    },
    limit: 10,
    total: 5,
  },
};
