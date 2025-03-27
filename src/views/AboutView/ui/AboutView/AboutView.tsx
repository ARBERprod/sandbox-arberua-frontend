import { memo } from 'react';
import cn from 'classnames';
import { PageTitle } from '@/shared/ui/PageTitle';
import AboutBg1 from '@/shared/assets/images/about-page/about-bg-1.jpg';
import AboutBg2 from '@/shared/assets/images/about-page/about-bg-2.jpg';
import { useTranslation } from 'next-i18next';
import styles from './AboutView.module.scss';
import { AboutBrandSection } from '../sections/AboutBrandSection';
import { AboutBannerWithContentSection } from '../sections/AboutBannerWithContentSection';
import { getAboutBrandSections } from '../../constants';

interface AboutViewProps {
  className?: string;
}

export const AboutView = memo(({ className }:AboutViewProps) => {
  const { t } = useTranslation('about-page');
  return (
    <div className={cn(styles.root, className)}>
      <PageTitle>{t('heading')}</PageTitle>
      <AboutBannerWithContentSection
        title={t('banner.title')}
        subtitle={t('banner.subtitle')}
        variant="primary"
        Image={AboutBg1}
      />
      <AboutBrandSection
        title={getAboutBrandSections(t)[0].title}
        list={getAboutBrandSections(t)[0].list}
        image={getAboutBrandSections(t)[0].image}
        variant="left"
      />
      <AboutBrandSection
        title={getAboutBrandSections(t)[1].title}
        list={getAboutBrandSections(t)[1].list}
        image={getAboutBrandSections(t)[1].image}
        variant="right"
      />
      <AboutBrandSection
        title={getAboutBrandSections(t)[2].title}
        list={getAboutBrandSections(t)[2].list}
        image={getAboutBrandSections(t)[2].image}
        variant="left"
      />
      <AboutBannerWithContentSection
        title={t('banner1.title')}
        subtitle={t('banner1.subtitle')}
        variant="secondary"
        Image={AboutBg2}
      />
      <AboutBrandSection
        title={getAboutBrandSections(t)[3].title}
        list={getAboutBrandSections(t)[3].list}
        image={getAboutBrandSections(t)[3].image}
        variant="right"
      />
      <AboutBrandSection
        title={getAboutBrandSections(t)[4].title}
        list={getAboutBrandSections(t)[4].list}
        image={getAboutBrandSections(t)[4].image}
        variant="left"
      />
      <AboutBrandSection
        title={getAboutBrandSections(t)[5].title}
        list={getAboutBrandSections(t)[5].list}
        image={getAboutBrandSections(t)[5].image}
        variant="right"
      />
    </div>
  );
});
