import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { ManWomanSlider } from '@/widgets/ProductPresenter';
import { useTranslation } from 'next-i18next';
import styles from './NewsSection.module.scss';
import { SliderData } from '../../../api/types';
import { useSectionData } from '../../../lib/useSectionData';

interface NewsSectionProps {
  className?: string;
  latestData: SliderData[];
}

export const NewsSection = memo(({
  className,
  latestData,
}: NewsSectionProps) => {
  const {
    products, tabs, chosenTab, onTabChange, href,
  } = useSectionData(latestData);
  const { t } = useTranslation('main-page');

  if (latestData.length === 0) return null;

  return (
    <section className={cn(styles.root, className)}>
      <Container>
        <ManWomanSlider
          href={href}
          title={t('new_slider.title')}
          chosenTab={chosenTab}
          onTabChange={onTabChange}
          tabs={tabs}
          products={products}
        />
      </Container>
    </section>
  );
});
