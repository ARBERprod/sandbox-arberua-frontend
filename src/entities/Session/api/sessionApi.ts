import { rtkApi, SESSION_TAG } from '@/shared/api/rtkApi';

import {
  SessionDto, SignInBody, SignUpBody,
} from './types';

export const sessionApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    sessionFetch: build.query<SessionDto, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/sessions`,
      }),
      providesTags: [SESSION_TAG],
    }),

    signIn: build.mutation<void, SignInBody>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/sign-in`,
        body,
      }),
    }),

    signUp: build.mutation<void, SignUpBody>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/sign-up`,
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/logout`,
      }),
    }),
    forgetPassword: build.mutation<void, { email: string }>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/forgotten`,
        body,
      }),
    }),
    changePassword: build.mutation<
      void,
      { email: string; token: string; password: string; password_confirmation: string }
    >({
      query: ({
        password, password_confirmation, token, email,
      }) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/change-password`,
        body: {
          password,
          password_confirmation,
          token,
          email,
        },
      }),
    }),
  }),
});

export const {
  endpoints: {
    sessionFetch,
    signIn,
    signUp,
  },
  useSessionFetchQuery,
  useLazySessionFetchQuery,
  useLogoutMutation,
  useForgetPasswordMutation,
  useChangePasswordMutation,
} = sessionApi;
