import { ImageType } from '@/shared/types/common';
import { Staff } from '@/entities/Staff';

export interface Shop {
  id: string;
  title: string;
  pickup_phone: string;
  pickup_address: string;
  pickup_time: string;
  latitude: number;
  longitude: number;
  url: string;
  pictures?: ImageType[];
}

export interface DetailedShop extends Shop {
  staff: Staff[];
}
