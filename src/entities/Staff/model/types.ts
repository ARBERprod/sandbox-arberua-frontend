import { ImageType } from '@/shared/types/common';
import { Shop } from '@/entities/Shop';

export interface Staff {
  id: string;
  user_name: string;
  picture: ImageType;
  store: Shop;
  url: string;
}

export interface DetailedStaff {
  id: string;
  user_name: string;
  picture: ImageType;
  url: string;
  comments: {
    comments_count: number;
    comments_avg_rating: string;
  };
  store: Shop;
}
