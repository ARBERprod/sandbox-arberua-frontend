import { SuccessApiResponse, SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Shop, DetailedShop } from '@/entities/Shop';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { City } from '@/entities/Location';

export type ShopsData = {
  stores: Shop[];
  breadcrumbs: Breadcrumb[];
  cities: City[];
}

export type ShopsDto = SuccessApiResponseWithMeta<ShopsData>;

export type GetShopsParameters = { page: number, city_id?: string; merge?: boolean };

export type ShopDto = SuccessApiResponse<DetailedShop>;

export type GetShopParameters = { shopId: string };

export type ReservationType = 'reservation' | 'clothe';
