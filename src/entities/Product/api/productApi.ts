import { PRODUCTS_HISTORY, rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import {
  GetProductAvailabilityData, GetProductAvailabilityDto, GetProductDto, ProductReservationData,
} from './types';
import { QuantityUtils } from '@/entities/Product/lib/QuantityUtils';
import { Product } from '@/entities/Product';

export const productApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProduct: build.query<GetProductDto, { slug: string }>({
      query: ({ slug }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${slug}`,
      }),
      transformResponse: (response: SuccessApiResponse<GetProductDto>) => response.data,
    }),
    getProductAvailability: build.query<GetProductAvailabilityData, {productId: string, activeCityId: string}>({
      query: ({ productId }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${productId}/quantities`,
      }),
      transformResponse: (response: SuccessApiResponse<GetProductAvailabilityDto>, _, { activeCityId }) => {
        const transformedResponse: GetProductAvailabilityData = {
          cities: response.data.cities,
          quantities: QuantityUtils.getQuantitiesCrop(response.data.quantities, activeCityId),
        };
        return transformedResponse;
      },
    }),
    getProductReservationData: build.query<ProductReservationData, {identifier_sync: string}>({
      query: ({ identifier_sync }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${identifier_sync}/inventory`,
      }),
      transformResponse: (response: SuccessApiResponse<ProductReservationData>) => response.data,
    }),
    addProductToHistoryAndGetHistory: build.mutation<Product[], { productId: string }>({
      query: ({ productId }) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${productId}/history`,
      }),
      transformResponse: (response: SuccessApiResponse<Product[]>) => response.data,
      invalidatesTags: [PRODUCTS_HISTORY],
    }),

    getHistoryProducts: build.query<Product[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/histories`,
      }),
      transformResponse: (response: SuccessApiResponse<Product[]>) => response.data,
      providesTags: [PRODUCTS_HISTORY],
    }),

    clearProductsHistory: build.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/histories`,
      }),
      invalidatesTags: [PRODUCTS_HISTORY],
    }),

    deleteProductFromHistory: build.mutation<void, {productId: string}>({
      query: ({ productId }) => ({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${productId}/history`,
      }),
      invalidatesTags: [PRODUCTS_HISTORY],
    }),
  }),
});

export const {
  endpoints: { getProduct },
  useGetProductAvailabilityQuery,
  useAddProductToHistoryAndGetHistoryMutation,
  useClearProductsHistoryMutation,
  useGetHistoryProductsQuery,
  useDeleteProductFromHistoryMutation,
  useGetProductReservationDataQuery,
} = productApi;
