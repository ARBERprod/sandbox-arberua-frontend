import { rtkApi } from '@/shared/api/rtkApi';

interface SendCallbackDto {
  user_name: string;
  phone: string;
}

const callbackApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    sendCallback: build.mutation<void, SendCallbackDto>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/callbacks`,
        body,
      }),
    }),
  }),
});

export const { useSendCallbackMutation } = callbackApi;
