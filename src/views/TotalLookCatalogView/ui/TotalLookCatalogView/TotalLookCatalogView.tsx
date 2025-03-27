import { memo, useCallback } from 'react';
import cn from 'classnames';
import { ManWomanBanner } from '@/shared/ui/ManWomanBanner';
import { Container } from '@/shared/ui/Container';
import totallookBanner from '@/shared/assets/images/totallook-banner/new-totallook-banner-bg.jpg';
import totallookBannerMan from '@/shared/assets/images/totallook-banner/new-totallook-banner-man.png';
import totallookBannerWoman from '@/shared/assets/images/totallook-banner/new-totallook-banner-woman.png';
import { CardView } from '@/shared/types/common';
import { TotalLookGrid } from '@/widgets/TotalLookPresenter';
import { useTranslation } from 'next-i18next';
import { useGetTotalLookCatalogQuery } from '@/entities/TotalLook';
import { PageLoader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';
import { cookieService } from '@/shared/lib/services/cookie.service';
import { useSelector } from 'react-redux';
import { UISelectors, useUIActions } from '@/entities/UI';
import { GridViewSwitcher } from '@/shared/ui/GridViewSwitcher';
import { useRouter } from 'next/router';
import { CatalogPagination, usePaginate } from '@/widgets/CatalogPagination';
import { routerPaths } from '@/shared/config/router';
import styles from './TotalLookCatalogView.module.scss';

interface TotalLookCatalogViewProps {
    className?: string;
}

export const TotalLookCatalogView = memo(({ className }: TotalLookCatalogViewProps) => {
  const { t } = useTranslation();
  const {
    query,
    push,
  } = useRouter();

  const type = query.gender as string | undefined;

  const {
    page,
    pageChangeHandler,
    merge,
    moreBtnClickHandler,
  } = usePaginate();

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetTotalLookCatalogQuery({
    type,
    merge,
    page,
  });

  const view = useSelector(UISelectors.getGlobalView);
  const { setView } = useUIActions();

  const viewChangeHandler = useCallback((view: CardView) => {
    setView(view);
    cookieService.set(COOKIE_VIEW_KEY, view);
  }, [setView]);

  if (isLoading) return <PageLoader />;
  if (isError || !data) return <ErrorMessage error="Error" />;

  return (
    <div className={cn(styles.root, className)}>
      <ManWomanBanner
        backgroundDesktop={totallookBanner}
        backgroundMobile={totallookBanner}
        man={totallookBannerMan}
        woman={totallookBannerWoman}
        title={t('total-look-catalog.banner.title')}
        description={t('total-look-catalog.banner.description')}
        onManButtonClick={() => push(routerPaths.total_look_catalog(data.data.types.man.value))}
        onWomanButtonClick={() => push(routerPaths.total_look_catalog(data.data.types.women.value))}
        manButtonText={data.data.types.man.title}
        womanButtonText={data.data.types.women.title}
        isPageBanner
        colorWhite
      />
      <div className={styles.body}>
        <Container>
          <GridViewSwitcher className={styles.actions} value={view} onChange={viewChangeHandler} />
          <TotalLookGrid
            totalLooks={data.data.looks}
            view={view}
            className={styles.grid}
          />
          <CatalogPagination
            className={styles.pagination}
            isFetching={isFetching}
            totalPages={data.meta.page.total}
            currentPage={data.meta.page.current}
            onButtonClick={moreBtnClickHandler}
            onPageChange={pageChangeHandler}
          />
        </Container>
      </div>
    </div>
  );
});
