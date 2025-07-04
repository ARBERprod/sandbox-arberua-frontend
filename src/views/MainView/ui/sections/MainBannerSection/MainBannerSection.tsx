import { memo } from 'react';
import cn from 'classnames';
import { BannerCategory, MainPageDto } from '@/views/MainView/api/types';
import styles from './MainBannerSection.module.scss';
import { FullscreenBannerSlider } from '../../FullscreenBannerSlider';
import { useTranslation } from 'next-i18next';

interface MainBannerSectionProps {
  className?: string;
  bannerData: MainPageDto['banner'];
  categories: BannerCategory[];
}

export const MainBannerSection = memo(({ bannerData, categories, className }:MainBannerSectionProps) => {
  const { t } = useTranslation('main-page');

  return (
    <>
      <h1 className="d-none">
        {t('home_page_seo_text.title')}
      </h1>
      <section className={cn(styles.root, className)}>
        <FullscreenBannerSlider
          bannerData={bannerData}
          categories={categories}
          classes={{
            slide: styles.slide,
          }}
        />
      </section>
    </>
  );
});
