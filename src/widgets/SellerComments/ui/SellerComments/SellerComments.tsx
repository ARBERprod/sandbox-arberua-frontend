import { memo, useState } from 'react';
import cn from 'classnames';
import { CommentsList, useGetSellerCommentsQuery } from '@/entities/Comment';
import { Pagination } from '@/shared/ui/Pagination';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { useTranslation } from 'next-i18next';
import { SendCommentButton } from '@/widgets/SendCommentButton';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import styles from './SellerComments.module.scss';

interface SellerCommentsProps {
  className?: string;
  sellerId: string;
}

export const SellerComments = memo(({ className, sellerId }:SellerCommentsProps) => {
  const { data, isLoading, isError } = useGetSellerCommentsQuery({ sellerId });
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  if (isLoading) return <Loader centered />;

  if (isError || !data) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <Flex
        direction="column"
        align="start"
        gap="12"
        className={styles.header}
      >
        <Typography variant="title-4">{t('seller_reviews')}</Typography>
        <SendCommentButton
          className={styles.button}
          receiver="consultant"
          entityId={sellerId}
        />
      </Flex>
      <div className={styles.inner}>
        <CommentsList comments={data.data} variant="seller" />
        {data.meta.page.total > 1 && (
          <div className={styles.pagination}>
            <Pagination
              pageCount={data.meta.page.total}
              onPageChange={(page: number) => setPage(page)}
              activePage={page}
            />
          </div>
        )}
      </div>
    </div>
  );
});
