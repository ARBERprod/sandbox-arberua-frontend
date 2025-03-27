import { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  BaseQueryApi,
  QueryReturnValue,
} from '@reduxjs/toolkit/src/query/baseQueryTypes';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { StatusCode } from '@/shared/types/api';
import { csrf } from '../csrf';
import { baseQuery } from './baseQuery';

export async function baseQueryWithReauth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: Record<string, unknown>,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
  let result = await baseQuery(args, api, extraOptions);
  let isRefetched = false;

  if (
    !isRefetched
    && typeof result.error?.status === 'number'
    && result.error?.status === StatusCode.SCRF_MISMATCH
  ) {
    await csrf();
    isRefetched = true;
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
}
