import { rtkApi } from '@/shared/api/rtkApi';

type SendFeedbackDto = {
  user_name: string;
  email: string;
  content: string;
}

const contactUsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendFeedback: build.mutation<void, SendFeedbackDto>({
      query: (dto) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/supports`,
        body: dto,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSendFeedbackMutation } = contactUsApi;
