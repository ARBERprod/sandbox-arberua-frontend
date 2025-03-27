import { rtkApi } from '@/shared/api/rtkApi';
import {
  GetShopParameters, GetShopsParameters, ShopDto, ShopsDto,
} from './types';
import { DetailedShop } from '../model/types';

export const shopApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getShops: build.query<ShopsDto, GetShopsParameters>({
      query: ({ page, city_id }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/stores`,
        params: {
          page,
          city_id,
        },
      }),
      merge(
        currentCacheData: ShopsDto,
        responseData: ShopsDto,
        { arg: { merge } },
      ): void | ShopsDto {
        if (merge) {
          currentCacheData.data.stores.push(...responseData.data.stores);
          // eslint-disable-next-line
          currentCacheData.meta = responseData.meta;
        } else {
          return responseData;
        }
      },
      forceRefetch({
        currentArg,
        previousArg,
      }) {
        return (currentArg?.page !== previousArg?.page) || (currentArg?.city_id !== previousArg?.city_id);
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

    }),

    getShop: build.query<DetailedShop, GetShopParameters>({
      query: ({ shopId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/stores/${shopId}`,
      }),
      transformResponse(response: ShopDto) {
        return response.data;
      },
    }),

  }),
});

export const {
  useGetShopsQuery,
  useGetShopQuery,
  endpoints: {
    getShops,
    getShop,
  },
} = shopApi;
