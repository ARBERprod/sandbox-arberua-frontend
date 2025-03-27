import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { ManWomanSlider } from '@/widgets/ProductPresenter';
import { useTranslation } from 'next-i18next';

import styles from './PopularsSection.module.scss';
import { SliderData } from '../../../api/types';
import { useSectionData } from '../../../lib/useSectionData';

interface PopularsSectionProps {
  className?: string;
  popular: SliderData[];
}

export const PopularsSection = memo(({ className, popular = [] }: PopularsSectionProps) => {
  const { t } = useTranslation('main-page');
  const {
    products, tabs, onTabChange, href, chosenTab,
  } = useSectionData(popular);
  if (products.length === 0) {
    return null;
  }

  return (
    <section className={cn(styles.root, className)}>
      <Container>
        <ManWomanSlider
          tabs={tabs}
          title={t('popular_slider.title')}
          href={href}
          products={products}
          onTabChange={onTabChange}
          chosenTab={chosenTab}
        />
      </Container>
    </section>
  );
});
