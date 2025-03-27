import { rtkApi } from '@/shared/api/rtkApi';
import { Consultation, ConsultationType } from '../model/types';
import { SuccessApiResponse } from '@/shared/types/api';
import { Shop } from '@/entities/Shop';
import { Staff } from '@/entities/Staff';
import { ConsultationAdapter } from '../lib/consultationAdapter';

type CreateConsultationDto = {
  store_id: string;
  staff_id: string;
  type: ConsultationType;
  user_name: string;
  phone: string;
}

export type ConsultationDto = {
  id: string;
  user_name: string;
  phone: string;
  type: ConsultationType;
  store: Shop;
  staff: Staff;
  created_at: string;
}

const consultationApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createConsultation: build.mutation<void, CreateConsultationDto>({
      query: (dto) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/consultations`,
        body: dto,
      }),
    }),
    getConsultations: build.query<Consultation[], void >({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/consultations`,
      }),
      transformResponse: (response: SuccessApiResponse<ConsultationDto[]>) => response.data.map(
        ConsultationAdapter.mapConsultationDtoToConsultation,
      ),
    }),
  }),
});

export const {
  useCreateConsultationMutation,
  useGetConsultationsQuery,
} = consultationApi;
