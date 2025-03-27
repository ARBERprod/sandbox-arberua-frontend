import { FC } from 'react';
import cn from 'classnames';
import RCPagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ru_RU';
import styles from './Pagination.module.scss';
import { getNewPageUrl } from '@/shared/lib/hooks/usePageUrlUpdate';
import { useRouter } from 'next/router';
import { PageControlFactory } from '../PageControlFactory';

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  activePage: number;
  useLinks?: boolean;
  className?: string;
}

export const Pagination: FC<PaginationProps> = ({
  className,
  pageCount,
  onPageChange,
  activePage,
  useLinks,
}) => {
  const { asPath } = useRouter();
  if (pageCount <= 1) return null;

  return (
    <RCPagination
      current={activePage}
      pageSize={1}
      data-testid="pagination"
      onChange={onPageChange}
      total={pageCount}
      locale={localeInfo}
      itemRender={(page, type) => {
        let href = '';
        if (useLinks) {
          href = getNewPageUrl(page, asPath);
        }
        return (
          <PageControlFactory
            page={page}
            key={page}
            activePage={activePage}
            type={type}
            href={href}
            pageCount={pageCount}
            onPageChange={onPageChange}
          />
        );
      }}
      className={cn(styles.root, className)}
    />
  );
};
