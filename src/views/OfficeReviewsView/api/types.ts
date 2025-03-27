import { ImageType } from '@/shared/types/common';

export interface ProductReviewDto {
  id: string;
  content: string;
  rating: number;
  status: string;
  created_at: string;
  commentable: {
    id: string;
    title: string;
    picture: ImageType;
    url: string;
  };
}

export interface SellerReviewDto {
  id: string;
  content: string;
  commentable: {
    id: string;
    user_name: string;
    picture: ImageType;
    url: string;
  };
  rating: number;
  status: string;
  created_at: string;
}
