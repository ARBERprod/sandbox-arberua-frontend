import { memo } from 'react';
import { Pagination } from '@/shared/ui/Pagination';
import { FlexCol } from '@/shared/ui/Flex';
import { Loader } from '@/shared/ui/Loader';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import styles from './CatalogPagination.module.scss';
import cn from 'classnames';

interface CatalogPaginationProps {
  className?: string;
  isFetching: boolean;
  totalPages: number;
  currentPage: number;
  showMoreBtn?: boolean;
  onButtonClick: () => void;
  onPageChange: (page: number) => void;
}

export const CatalogPagination = memo(({
  className,
  onButtonClick,
  onPageChange,
  totalPages,
  currentPage,
  isFetching,
  showMoreBtn = true,
}: CatalogPaginationProps) => {
  const { t } = useTranslation();
  const renderPaginationButton = () => {
    if (isFetching) return <Loader className={styles.paginate} />;
    const hasMore = currentPage < totalPages;
    if (!hasMore || !showMoreBtn) return null;
    return (
      <Button
        className={cn(styles.paginate, styles.btn)}
        color="light-secondary"
        onClick={onButtonClick}
      >
        {t('show_more')}
      </Button>
    );
  };
  return (
    <FlexCol className={className} align="center">
      <Pagination
        pageCount={totalPages}
        onPageChange={onPageChange}
        activePage={currentPage}
        useLinks
      />
      {renderPaginationButton()}
    </FlexCol>
  );
});
