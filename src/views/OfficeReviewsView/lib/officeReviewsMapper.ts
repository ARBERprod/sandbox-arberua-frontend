import dayjs from 'dayjs';
import { Consultation } from '@/entities/Consultation';
import { ProductReviewDto, SellerReviewDto } from '../api/types';
import { ProductReview } from '../model/types';

class OfficeReviewsMapper {
  mapProductReviews(productReviewDto: ProductReviewDto):ProductReview {
    const {
      id, rating, content, created_at, commentable,
    } = productReviewDto;
    return {
      id,
      date: dayjs(new Date(created_at)).format('MM.DD.YYYY'),
      product: {
        id: commentable.id,
        picture: commentable.picture,
        title: commentable.title,
        url: commentable.url,
      },
      comment: {
        content,
        rating,
      },
    };
  }

  mapSellerReviews(sellerReviewDto: SellerReviewDto):Consultation {
    const {
      id, rating, content, commentable, created_at,
    } = sellerReviewDto;
    return {
      id,
      date: dayjs(new Date(created_at)).format('MM.DD.YYYY'),
      consultant: {
        id: commentable.id,
        picture: commentable.picture,
        user_name: commentable.user_name,
        url: commentable.url,
      },
      review: {
        comment: content,
        rating,
      },
    };
  }
}

export const officeReviewsMapper = new OfficeReviewsMapper();
