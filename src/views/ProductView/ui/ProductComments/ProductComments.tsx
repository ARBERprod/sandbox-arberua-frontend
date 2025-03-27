import {
  memo, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { CommentsList, useGetProductCommentsQuery } from '@/entities/Comment';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Pagination } from '@/shared/ui/Pagination';
import { SendCommentButton } from '@/widgets/SendCommentButton';
import { scrollToRef } from '@/shared/lib/utils/scrollToRef';
import styles from './ProductComments.module.scss';
import { useTranslation } from 'next-i18next';

interface ProductCommentsProps {
  className?: string;
  productId: string;
  setCommentsCount: (count: number) => void;
}

export const ProductComments = memo(({
  productId,
  className,
  setCommentsCount,
}: ProductCommentsProps) => {
  const [commentsPage, setCommentsPage] = useState(1);
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const pageChangeHandler = (page: number) => {
    setCommentsPage(page);
    scrollToRef(commentsRef);
  };
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetProductCommentsQuery({
    productId,
    page: commentsPage,
  });
  useEffect(() => {
    if (data) {
      setCommentsCount(data.meta.total);
    }
  }, [data, setCommentsCount]);
  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorMessage error={t('error-receiving-comments')} />;
  return (
    <div ref={commentsRef} className={cn(styles.root, className)}>
      <SendCommentButton className={styles.btn} receiver="product" entityId={productId} />
      <CommentsList comments={data.data} />
      {isFetching ? <Loader centered /> : (
        <Pagination
          pageCount={data.meta.page.total}
          onPageChange={pageChangeHandler}
          activePage={data.meta.page.current}
          className={styles.centered}
        />
      )}
    </div>
  );
});
