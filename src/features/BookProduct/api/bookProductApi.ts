import { rtkApi } from '@/shared/api/rtkApi';
import { ReservationType } from '@/entities/Shop';

type CreateProductReservationBody = {
  product_id: string;
  city_id: string;
  store_id: string;
  phone: string;
  type: ReservationType;
}

const bookProductApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createProductReservation: build.mutation<void, CreateProductReservationBody>({
      query: ({
        store_id,
        product_id,
        city_id,
        phone,
        type,
      }) => ({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL_V2}/products/${product_id}/reservation`,
        body: {
          store_id,
          city_id,
          phone,
          type,
        },
      }),
    }),
  }),
});

export const { useCreateProductReservationMutation } = bookProductApi;
