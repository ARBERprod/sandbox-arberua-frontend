import { rtkApi } from '@/shared/api/rtkApi';
import { checkoutOptionsMapper } from '../lib/checkoutOptionsMapper';
import { RadioOption } from '@/shared/ui/Form/RadioField';
import {
  CheckoutDto,
  CheckoutResponseDto,
  DeliveryMethod,
  DeliveryMethodsDto, LiqPayFormDto,
  PaymentMethodsDto,
  PickupPointsData,
  PickupPointsDto,
  Warehouse,
  WarehousesDto,
  WayForPayFormDto,
  XPayFormDto,
  PayPlaceFormDto,
} from './types';
import { SuccessApiResponse } from '@/shared/types/api';

const checkoutApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getPaymentMethods: build.query<RadioOption[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/payment-methods`,
      }),
      transformResponse: (response: PaymentMethodsDto) => response.data.map(
        checkoutOptionsMapper.mapPaymentMethodToOptions,
      ),
    }),
    getDeliveryMethods: build.query<DeliveryMethod[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/delivery-methods`,
      }),
      transformResponse: (response: DeliveryMethodsDto) => response.data,
    }),
    getWarehouses: build.query<Warehouse[], { type?: string; city_id?: string }>({
      query: ({
        type,
        city_id,
      }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/warehouses`,
        params: {
          type,
          is_city_id: city_id,
        },
      }),
      transformResponse: (response: WarehousesDto) => response.data,
    }),
    // Pickup store points filtered by live cart stock (Decision 2). Geo param is
    // `city_id` — NOT the legacy `is_city_id` of getWarehouses (contract-fixed).
    getPickupPoints: build.query<PickupPointsData, { city_id?: string }>({
      query: ({ city_id }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/checkout/pickup-points`,
        params: {
          city_id,
        },
      }),
      transformResponse: (response: PickupPointsDto) => response.data,
    }),
    checkout: build.mutation<CheckoutResponseDto, CheckoutDto>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/orders`,
        body,
      }),
      transformResponse: (response: SuccessApiResponse<CheckoutResponseDto>) => response.data,
    }),
    getWayForPayForm: build.query<string, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/payment-process/${orderId}/wayforpay`,
      }),
      transformResponse: (response: WayForPayFormDto) => response.data,
    }),
    getLiqPayForm: build.query<string, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/payment-process/${orderId}/liqpay`,
      }),
      transformResponse: (response: LiqPayFormDto) => response.data,
    }),
    getXPayForm: build.query<string, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/payment-process/${orderId}/xpay`,
      }),
      transformResponse: (response: XPayFormDto) => response.data,
    }),
    getPayPlaceForm: build.query<string, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/payment-process/${orderId}/payplace`,
      }),
      transformResponse: (response: PayPlaceFormDto) => response.data,
    }),
  }),
});

export const {
  endpoints: {
    checkout,
    getLiqPayForm,
    getWayForPayForm,
    getXPayForm,
    getPayPlaceForm,
    getPickupPoints,
  },
  useCheckoutMutation,
  useGetDeliveryMethodsQuery,
  useGetPaymentMethodsQuery,
  useGetWarehousesQuery,
  useGetPickupPointsQuery,

} = checkoutApi;
