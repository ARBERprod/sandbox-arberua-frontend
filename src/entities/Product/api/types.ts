import { SeoData } from '@/shared/types/common';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { DetailedProduct, Product, ProductQuantity } from '../model/types';
import { City } from '@/entities/Location';

type AvailabilityItem = {
  id: string;
  city_id: string;
  title: string;
}

export type GetProductDto = {
  product: DetailedProduct;
  breadcrumbs: Breadcrumb[];
  recommended: Product[];
  markup: SeoData;
}

export type GetProductAvailabilityData = {
  cities: City[];
  quantities: ProductQuantity[];
}

export type GetProductAvailabilityDto = {
  cities: City[];
  quantities: ProductQuantity[];
}

export type ProductReservationData = {
  cities: City[];
  stores: AvailabilityItem[];
}
