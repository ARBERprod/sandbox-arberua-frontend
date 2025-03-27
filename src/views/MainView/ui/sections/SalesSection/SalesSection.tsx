import { memo } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import { ManWomanSlider } from '@/widgets/ProductPresenter';
import { useSectionData } from '../../../lib/useSectionData';
import styles from './SalesSection.module.scss';
import { SliderData } from '../../../api/types';

interface SalesSectionProps {
  className?: string;
  sliderData: SliderData[]
}

export const SalesSection = memo(({ className, sliderData = [] }: SalesSectionProps) => {
  const {
    products, tabs, onTabChange, href, chosenTab,
  } = useSectionData(sliderData);

  if (sliderData.length === 0) return null;

  return (
    <section className={cn(styles.root, className)}>
      <Container>
        <ManWomanSlider
          tabs={tabs}
          title="Outlet"
          href={href}
          products={products}
          onTabChange={onTabChange}
          chosenTab={chosenTab}
        />
      </Container>
    </section>
  );
});
