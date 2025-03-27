import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Comment } from '../model/types/Comment';

export type CommentsDto = SuccessApiResponseWithMeta<Comment[]>

export type ProductReviewBody = {
  product_id: string;
  content: string;
  rating: number;
};
export type SellerReviewBody = {
  sellerId: string;
  content: string;
  rating: number;
};
