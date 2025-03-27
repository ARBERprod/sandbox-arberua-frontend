import { rtkApi, SESSION_TAG } from '@/shared/api/rtkApi';

import { PersonalDataBody, EditPasswordBody } from './types';

export const editPersonalDataApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    updatePersonalData: build.mutation<void, PersonalDataBody>({
      query: (body) => ({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile`,
        body,
      }),
      invalidatesTags: [SESSION_TAG],
    }),

    updatePhone: build.mutation<void, { phone: string }>({
      query: (body) => ({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/phone/update`,
        body,
      }),
      invalidatesTags: [SESSION_TAG],
    }),
    updateEmail: build.mutation<void, { email: string }>({
      query: (body) => ({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/email/update`,
        body,
      }),
      invalidatesTags: [SESSION_TAG],
    }),
    updatePassword: build.mutation<void, EditPasswordBody>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/password/update`,
        body,
      }),
    }),
  }),
});

export const {
  useUpdatePersonalDataMutation,
  useUpdatePhoneMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} = editPersonalDataApi;
