import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import {
  AddManyProductsBody, AddToCartBody, DeleteProductParams, UpdateProductParams,
} from './types';
import { CartData } from '../model/types/types';

export const cartApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    addProductToCart: build.mutation<CartData, AddToCartBody>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/add`,
        body,
      }),
      transformResponse: (response: SuccessApiResponse<CartData>) => response.data,
    }),
    addManyProductsToCart: build.mutation<CartData, AddManyProductsBody>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/multiple`,
        body,
      }),
      transformResponse: (response: SuccessApiResponse<CartData>) => response.data,
    }),
    deleteCart: build.mutation<CartData, void>({
      query: () => ({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/truncate`,
      }),
      transformResponse: (response: SuccessApiResponse<CartData>) => response.data,
    }),
    deleteProduct: build.mutation<CartData, DeleteProductParams>({
      query: ({
        itemId,
      }) => ({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/${itemId}/delete`,
      }),
      transformResponse: (response: SuccessApiResponse<CartData>) => response.data,
    }),
    markCheckoutStarted: build.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/checkout-started`,
      }),
    }),
    updateProduct: build.mutation<CartData, UpdateProductParams>({
      query: ({
        itemId,
        quantity,
      }) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/${itemId}/edit-quantity`,
        body: {
          quantity,
          _method: 'put',
        },
      }),
      transformResponse: (response: SuccessApiResponse<CartData>) => response.data,
    }),
    applyPromocode: build.mutation<CartData, { code: string }>({
      query: ({ code }) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/apply-promocode`,
        body: { code },
      }),
      transformResponse: (response: SuccessApiResponse<CartData>) => response.data,
    }),
    removePromocode: build.mutation<CartData, void>({
      query: () => ({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/remove-promocode`,
      }),
      transformResponse: (response: SuccessApiResponse<CartData>) => response.data,
    }),
  }),
});

export const {
  useAddProductToCartMutation,
  useDeleteProductMutation,
  useDeleteCartMutation,
  useUpdateProductMutation,
  useAddManyProductsToCartMutation,
  useMarkCheckoutStartedMutation,
  useApplyPromocodeMutation,
  useRemovePromocodeMutation,
} = cartApi;
