import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse, SuccessApiResponseWithMeta } from '@/shared/types/api';
import { OrderDto } from './types';
import { Order } from '../model/types';
import { orderMapper } from '../lib/orderMapper';

export const orderApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getOrders: build.query<SuccessApiResponseWithMeta<Order[]>, {page?: number}>({
      query: ({ page = 1 }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/orders`,
        params: {
          page,
        },
      }),
      transformResponse: (response: SuccessApiResponseWithMeta<OrderDto[]>): SuccessApiResponseWithMeta<Order[]> => ({
        meta: response.meta,
        success: response.success,
        data: response.data.map(orderMapper),
      }),
    }),
    getSuccessOrderInfo: build.query<OrderDto, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/orders/${orderId}/success`,
      }),
      transformResponse: (response: SuccessApiResponse<OrderDto>) => response.data,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetSuccessOrderInfoQuery,
  endpoints: { getSuccessOrderInfo },

} = orderApi;
