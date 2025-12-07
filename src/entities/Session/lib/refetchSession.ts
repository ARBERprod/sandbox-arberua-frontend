import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '@/shared/api/api';
import { SessionDto } from '../api/types';

export const refetchSession = createAsyncThunk<SessionDto, void>(
  'session/refetch',
  async () => {
    const response = await $api.get<SessionDto>(
      `${process.env.NEXT_PUBLIC_API_URL_V2}/sessions`,
    );
    return response.data;
  },
);
