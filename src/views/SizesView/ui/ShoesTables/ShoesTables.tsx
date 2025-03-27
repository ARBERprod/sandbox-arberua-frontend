import { memo } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { ShoesSizeTable } from '@/entities/Size';
import { womanShoesItem, manShoesItem } from '@/entities/Size/constants/dimensionalGridsData';
import styles from './ShoesTables.module.scss';

interface ShoesTablesProps {
  className?: string;
}

export const ShoesTables = memo(({ className }:ShoesTablesProps) => {
  const { t } = useTranslation(['sizes']);
  return (
    <div className={cn(styles.root, className)}>
      <ShoesSizeTable data={manShoesItem()} title={t('sizes:mens_shoe_size_grid')} />
      <ShoesSizeTable data={womanShoesItem()} title={t('sizes:women_dimensional_grid_of_shoes')} />
    </div>
  );
});
