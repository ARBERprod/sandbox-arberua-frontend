import { memo, useEffect } from 'react';
import cn from 'classnames';
import { PageLoader } from '@/shared/ui/Loader';
import { ErrorMessage } from '@/shared/ui/Form/ErrorMessage';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';
import { SalesSection } from '../sections/SalesSection';
import { NewsSection } from '../sections/NewsSection';
import { MainBannerSection } from '../sections/MainBannerSection';
import { AboutBrandSection } from '../sections/AboutBrandSection';
import { InstagramFeedbackSection } from '../sections/InstagramFeedbackSection';
import styles from './MainView.module.scss';
import { useMainPageData } from '../../lib/useMainPageData';
import { PopularsSection } from '../sections/PopularsSection';
import { TotalLookSection } from '../sections/TotalLookSection';
import { CollectionsSection } from '../sections/CollectionsSection';

interface MainViewProps {
  className?: string;
}

export const MainView = memo(({ className }: MainViewProps) => {
  const {
    isLoading,
    errors,
    banners,
    baseCategories,
    latest,
    totalLook,
    collection,
    sale,
    popular,
    instagrams,
  } = useMainPageData();

  useEffect(() => {
    sendEsEvent('MainPage');
  }, []);

  if (isLoading) return <PageLoader />;
  if (errors.banners) return <ErrorMessage error="Error" />;
  return (
    <div className={cn(styles.root, className)}>
      <MainBannerSection
        categories={baseCategories}
        bannerData={banners}
      />
      <div className={styles.page}>
        <NewsSection latestData={latest} className={styles.news} />
        <CollectionsSection collections={collection} className={styles.collection} />
        <PopularsSection className={styles.populars} popular={popular} />
        <TotalLookSection totalLook={totalLook} className={styles.look} />
        <SalesSection className={styles.sales} sliderData={sale} />
        <AboutBrandSection className={styles.about} />
        <InstagramFeedbackSection instagrams={instagrams} className={styles.feedback} />
      </div>
    </div>
  );
});
