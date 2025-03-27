import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import { VacancyData } from './types';

export const vacancyApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getVacancyData: build.query<VacancyData, {city_id?: string}>({
      query: ({ city_id }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/vacancies`,
        params: {
          city_id,
        },
      }),

      transformResponse: (response:SuccessApiResponse<VacancyData>) => response.data,
    }),
  }),
});

export const {
  useGetVacancyDataQuery,
  endpoints: { getVacancyData },
} = vacancyApi;
