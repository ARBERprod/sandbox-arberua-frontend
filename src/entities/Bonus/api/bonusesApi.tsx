import { Bonus } from '@/entities/Bonus';
import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponseWithMeta } from '@/shared/types/api';

const bonusesApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getOfficeBonuses: build.query<SuccessApiResponseWithMeta<Bonus[]>, { page?: number }>(
      {
        query: ({ page = 1 }) => ({
          url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/bonuses`,
          params: {
            page,
          },
        }),
      },
    ),
  }),
});

export const { useGetOfficeBonusesQuery } = bonusesApi;
