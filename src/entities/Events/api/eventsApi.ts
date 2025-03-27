import { rtkApi } from '@/shared/api/rtkApi';

export const eventsApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    initiateCheckout: build.mutation<void, { eventId: string }>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/events/initiateCheckout`,
        body,
      }),
    }),

    search: build.mutation<void, { q: string; eventId: string }>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/events/search`,
        body,
      }),
    }),

    viewContent: build.mutation<void, { slug: string; eventId: string }>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/events/viewContenty`,
        body,
      }),
    }),
  }),
});

export const {
  useInitiateCheckoutMutation,
  useSearchMutation,
  useViewContentMutation,
} = eventsApi;
