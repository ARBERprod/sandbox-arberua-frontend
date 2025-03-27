import { memo } from 'react';
import Link from 'next/link';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { ManWomanSwitcherButtons, ManWomanTab } from '@/shared/ui/ManWomanSwitcherButtons';
import { Product } from '@/entities/Product';
import { useTranslation } from 'next-i18next';
import { ProductSlider } from '../ProductSlider';
import styles from './ManWomanSlider.module.scss';

interface ManWomanSliderProps {
  className?: string;
  products: Product[];
  chosenTab: string;
  onTabChange: (tab: string) => void;
  tabs: ManWomanTab[];
  title: string;
  href: string;
}

export const ManWomanSlider = memo(({
  className,
  products = [],
  chosenTab,
  onTabChange,
  href,
  title,
  tabs,
}: ManWomanSliderProps) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <Flex justify="between">
        <Typography variant="title-2">{title}</Typography>
        <ManWomanSwitcherButtons tabs={tabs} className="hide-mobile-tablet" setChosenTab={onTabChange} chosenTab={chosenTab} />
        {href && (
          <Link className={styles.link} href={href}>
            <Typography as="span" variant="body-2">{t('view_all')}</Typography>
          </Link>
        )}
      </Flex>
      <Flex fullWidth justify="center" className="mt-3 hide-desktop">
        <ManWomanSwitcherButtons tabs={tabs} chosenTab={chosenTab} setChosenTab={onTabChange} />
      </Flex>
      <ProductSlider className="mt-5" products={products} />
    </div>
  );
});
