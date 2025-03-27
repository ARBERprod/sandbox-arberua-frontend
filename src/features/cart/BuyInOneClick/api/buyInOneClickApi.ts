import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import { ImageType, Price } from '@/shared/types/common';

export type BuyInOneClickBody = {
  phone: string;
  items: {product_id: string; quantity: number}[];
}

export type OneClickProduct = {
  id: string;
  parent_id: string;
  category: string;
  brand: string;
  variant: string;
  old_price: Price | false;
  price: Price;
  options: {title: string; value: string}[];
  picture: ImageType;
  title: string;
  url: string;
}

const buyInOneClickApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    buyInOneClick: build.mutation<void, BuyInOneClickBody>({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/one-click`,
        method: 'POST',
        body,
      }),
    }),
    getProductsByIds: build.mutation<OneClickProduct[], {items: string[]}>({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/one-click/cart`,
        method: 'POST',
        body,
      }),
      transformResponse: (response:SuccessApiResponse<OneClickProduct[]>) => response.data,
    }),
  }),
});

export const { useBuyInOneClickMutation, useGetProductsByIdsMutation } = buyInOneClickApi;
