import { Shop } from '@/entities/Shop';

export type ProductAvailabilityModal =
  | 'booking'
  | 'booking-success'
  | 'product-availability'

export interface ProductAvailabilitySchema {
  activeModal: null | ProductAvailabilityModal;
  activeMobileAvailabilityView: 'map' | 'list'
  productId: string | null;
  activeShop: Shop | null;
  activeCityId: string;
}
