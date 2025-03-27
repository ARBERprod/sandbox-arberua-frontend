import { rtkApi } from '@/shared/api/rtkApi';

type PreorderProductDto = {
  product_id: string;
  user_name: string;
  phone: string;
}

const preorderProductApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    preorderProduct: builder.mutation<void, PreorderProductDto>({
      query: ({ product_id, ...body }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${product_id}/subscription`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { usePreorderProductMutation } = preorderProductApi;
