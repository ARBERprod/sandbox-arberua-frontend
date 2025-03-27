import { rtkApi } from '@/shared/api/rtkApi';

const signUpNewsApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    signUpNews: build.mutation<void, {email: string}>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/subscriptions`,
        body,
      }),
    }),
  }),
});

export const { useSignUpNewsMutation } = signUpNewsApi;
