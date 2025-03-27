import { memo } from 'react';
import cn from 'classnames';
import { BannerCategory, MainPageDto } from '@/views/MainView/api/types';
import styles from './MainBannerSection.module.scss';
import { FullscreenBannerSlider } from '../../FullscreenBannerSlider';

interface MainBannerSectionProps {
  className?: string;
  bannerData: MainPageDto['banner'];
  categories: BannerCategory[];
}

export const MainBannerSection = memo(({ bannerData, categories, className }:MainBannerSectionProps) => (
  <section className={cn(styles.root, className)}>
    <FullscreenBannerSlider
      bannerData={bannerData}
      categories={categories}
      classes={{
        slide: styles.slide,
      }}
    />
  </section>
));
