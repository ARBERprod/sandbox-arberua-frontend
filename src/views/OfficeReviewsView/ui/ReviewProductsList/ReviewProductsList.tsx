import { memo, useState } from 'react';
import cn from 'classnames';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';
import { OrderProductCard } from '@/entities/Order';
import { Typography } from '@/shared/ui/Typography';
import { SendCommentButton } from '@/widgets/SendCommentButton';
import { RatedComment } from '@/entities/Comment';
import { FlexCol } from '@/shared/ui/Flex';

import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Pagination } from '@/shared/ui/Pagination';
import { useGetProductReviewsQuery } from '../../api/officeReviewsApi';
import styles from './ReviewProductsList.module.scss';

interface ReviewProductsListProps {
  className?: string;
}

export const ReviewProductsList = memo(({ className }: ReviewProductsListProps) => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isError,
  } = useGetProductReviewsQuery({ page });
  if (isLoading) return <Loader centered />;
  if (!data || isError) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <FlexCol as="ul" gap="12" fullWidth>
        {data.data.map((review) => (
          <ExpandableCard key={review.id}>
            <OrderProductCard product={review.product} />
            <Typography className="mb-3 mt-4" variant="body-3">
              {review.date}
            </Typography>
            {review.comment
              ? <RatedComment rate={review.comment.rating} content={review.comment.content} />
              : <SendCommentButton receiver="product" entityId={review.product.id} />}
          </ExpandableCard>
        ))}
      </FlexCol>
      <Pagination
        className={styles.centered}
        pageCount={data.meta.page.total}
        onPageChange={(page: number) => setPage(page)}
        activePage={page}
      />
    </div>
  );
});
