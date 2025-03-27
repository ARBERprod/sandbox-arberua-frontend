import { rtkApi, SESSION_TAG } from '@/shared/api/rtkApi';
import { CreateAddressDto, UpdateAddressDto } from './types';

const addressApi = rtkApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createAddress: build.mutation<void, CreateAddressDto>({
      query: (body) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/addresses`,
        body,
      }),
      invalidatesTags: [SESSION_TAG],
    }),
    updateAddress: build.mutation<void, { addressId: string; address: UpdateAddressDto }>({
      query: ({
        addressId,
        address,
      }) => ({
        method: 'PUT',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/addresses/${addressId}`,
        body: address,
      }),
      invalidatesTags: [SESSION_TAG],
    }),
    deleteAddress: build.mutation<void, { addressId: string }>({
      query: ({ addressId }) => ({
        method: 'DELETE',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/profile/addresses/${addressId}`,
      }),
      invalidatesTags: [SESSION_TAG],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
