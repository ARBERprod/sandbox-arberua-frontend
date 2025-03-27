import { memo, useState } from 'react';
import cn from 'classnames';
import { ExpandableCard } from '@/shared/ui/ExpandableCard';
import { SendCommentButton } from '@/widgets/SendCommentButton';
import { ConsultationCard } from '@/entities/Consultation';
import { FlexCol } from '@/shared/ui/Flex';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Pagination } from '@/shared/ui/Pagination';
import { RatedComment } from '@/entities/Comment';
import styles from './ReviewConsultationsList.module.scss';
import { useGetSellerReviewsQuery } from '../../api/officeReviewsApi';

interface ReviewConsultationsListProps {
  className?: string;
}

export const ReviewConsultationsList = memo(({ className }: ReviewConsultationsListProps) => {
  const [page, setPage] = useState(1);
  const {
    data,
    isLoading,
    isError,
  } = useGetSellerReviewsQuery({ page });

  if (isLoading) return <Loader centered />;
  if (!data || isError) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <FlexCol as="ul" gap="12">
        {data.data.map((consultation) => (
          <ExpandableCard key={consultation.id}>
            <ConsultationCard
              withDetails
              commentSlot={consultation.review
                ? <RatedComment rate={consultation.review.rating} content={consultation.review.comment} />
                : <SendCommentButton receiver="consultant" entityId={consultation.consultant.id} />}
              consultation={consultation}
            />
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
