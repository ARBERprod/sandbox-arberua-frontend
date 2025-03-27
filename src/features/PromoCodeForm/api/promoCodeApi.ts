import { rtkApi } from '@/shared/api/rtkApi';

const promoCodeApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    promoCode: build.mutation<void, { promocode: string }>({
      query: ({ promocode }) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cart-se/aply-promocode`,
        body: { promocode },
      }),
    }),
  }),
});

export const { usePromoCodeMutation } = promoCodeApi;
