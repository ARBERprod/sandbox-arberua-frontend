import { rtkApi } from '@/shared/api/rtkApi';
import { SuccessApiResponse } from '@/shared/types/api';
import { CertificateDto, CertificatesData } from './types';
import { certificateMapper } from '../lib/certificateMapper';

export const certificateApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCertificates: build.query<CertificatesData, void>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/certificates`,
      }),
      transformResponse: (response: SuccessApiResponse<CertificateDto>) => ({
        certificates: response.data.products.map(certificateMapper),
        breadcrumbs: response.data.breadcrumbs,
      }),
    }),
  }),
});

export const {
  endpoints: {
    getCertificates,
  },
  useGetCertificatesQuery,
} = certificateApi;
