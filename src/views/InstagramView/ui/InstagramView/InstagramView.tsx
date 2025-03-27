import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { CardView } from '@/shared/types/common';
import { GridViewSwitcher } from '@/shared/ui/GridViewSwitcher';
import { Container } from '@/shared/ui/Container';
import { Typography } from '@/shared/ui/Typography';
import {
  InstagramGrid, InstagramModal, useGetInstagramsQuery,
} from '@/entities/InstagramFeedback';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';

import { useTranslation } from 'next-i18next';
import { UISelectors, useUIActions } from '@/entities/UI';
import { cookieService } from '@/shared/lib/services/cookie.service';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';
import { instagramViewReducer } from '../../model/slices/instagramViewSlice';

import styles from './InstagramView.module.scss';
import { Loader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { Pagination } from '@/shared/ui/Pagination';
import { usePaginate } from '@/widgets/CatalogPagination';

interface InstagramViewProps {
  className?: string;
}

export const InstagramView = memo(({ className }: InstagramViewProps) => {
  const view = useSelector(UISelectors.getGlobalView);
  const {
    pageChangeHandler,
    page,
  } = usePaginate();

  const {
    data,
    isLoading,
    isError,
  } = useGetInstagramsQuery({ page });

  const { setView } = useUIActions();
  const { t } = useTranslation();
  const viewChangeHandler = useCallback((view: CardView) => {
    setView(view);
    cookieService.set(COOKIE_VIEW_KEY, view);
  }, [setView]);
  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorMessage error="Error" />;

  return (
    <DynamicModuleLoader reducers={{ instagramPage: instagramViewReducer }}>
      <div className={cn(styles.root, className)}>
        <Container className={styles.container}>
          <Typography variant="title-2" className={styles.title}>
            {t('reviews-instagram')}
          </Typography>
          <div className={styles.display_actions}>
            <GridViewSwitcher className={styles.viewSwitcher} value={view} onChange={viewChangeHandler} />
          </div>
          <InstagramGrid className={styles.grid} instagrams={data.data} view={view} />
          <Pagination
            className={styles.pagination}
            pageCount={data.meta.page.total}
            onPageChange={pageChangeHandler}
            activePage={data.meta.page.current}
          />
          <InstagramModal />
        </Container>
      </div>
    </DynamicModuleLoader>
  );
});
