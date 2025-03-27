import { TableColumn } from '@/shared/ui/Table/types';
import { OrderProductCard } from '@/entities/Order';
import { ReviewTableCommentCell } from '@/views/OfficeReviewsView/ui/ReviewTableComment';
import { Consultation, ConsultationCard } from '@/entities/Consultation';
import { TFunction } from 'i18next';
import { ProductReview } from '../model/types';

export const productReviewColumns: (t: TFunction) => TableColumn<ProductReview>[] = (t) => [
  {
    header: t('office.goods'),
    accessor: ({ product }) => <OrderProductCard product={product} />,
  },
  {
    header: t('office.date'),
    accessor: 'date',
    sortAccessor: 'date',
  },
  {
    header: t('office.feedback'),
    accessor: ({ comment }) => <ReviewTableCommentCell comment={comment} />,
  },
];

export const consultationsReviewColumns: (t: TFunction) => TableColumn<Consultation>[] = (t) => [
  {
    header: t('office.consultants'),
    accessor: (consultation) => <ConsultationCard consultation={consultation} />,
  },
  {
    header: t('office.consultationDate'),
    accessor: 'date',
    sortAccessor: 'date',
  },
  {
    header: t('office.feedback'),
    accessor: ({ review }) => (
      <ReviewTableCommentCell
        comment={review ? { rating: review.rating, content: review.comment } : undefined}
      />
    ),
  },

];

// TODO: Apply correct sort data accessor
