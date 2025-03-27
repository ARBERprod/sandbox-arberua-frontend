import { rtkApi } from '@/shared/api/rtkApi';
import { City } from '@/entities/Location';
import { SuccessApiResponse } from '@/shared/types/api';
import { Country } from '@/entities/Location/model/types/city';

const locationApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    searchCities: build.query<City[], {q?: string, city_big?: 1 | 0}>({
      query: ({ q, city_big }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cities`,
        params: {
          q,
          is_large_city: city_big,
        },
      }),
      transformResponse: (response: SuccessApiResponse<City[]>) => response.data,
    }),
    getCityById: build.query<City, {city_id: string}>({
      query: ({ city_id }) => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cities`,
        params: {
          is_city_id: city_id,
        },
      }),
      transformResponse: (response: SuccessApiResponse<City[]>) => response.data[0],
    }),

    getBigCities: build.query<City[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/cities`,
        params: {
          is_large_city: 1,
        },
      }),
      transformResponse: (response: SuccessApiResponse<City[]>) => response.data,
    }),

    getCountries: build.query<Country[], void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/countries`,
      }),
      transformResponse: (response: SuccessApiResponse<Country[]>) => response.data,
    }),
  }),
});

export const {
  useSearchCitiesQuery, useGetCityByIdQuery, useGetCountriesQuery, useGetBigCitiesQuery,
} = locationApi;
