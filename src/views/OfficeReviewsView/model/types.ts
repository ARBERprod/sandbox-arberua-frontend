import { OrderProduct } from '@/entities/Order';
import { Comment } from '@/entities/Comment';

export interface ProductReview {
  id: string;
  product: Pick<OrderProduct, 'url' | 'picture' | 'title' | 'id'>;
  date: string;
  comment?: Pick<Comment, 'rating' | 'content'>
}
