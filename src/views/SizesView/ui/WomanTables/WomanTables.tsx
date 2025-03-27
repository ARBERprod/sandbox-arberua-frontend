import { memo } from 'react';
import cn from 'classnames';
import {
  ArberHeightSizesTable,
  TShirtSizesTable,
  WomanBottomSizesTable, WomanTopSizesTable, BeltsSizeTable,
} from '@/entities/Size';
import {
  womanTopClothesItem,
  womanBottomClothesItemJeans, womanBottomClothesItem,
  womanBottomClothesItemSport, arberHeightItem, womanTShortItem, beltsItem,
} from '@/entities/Size/constants/dimensionalGridsData';
import { useTranslation } from 'next-i18next';
import styles from './WomanTables.module.scss';

interface WomanTablesProps {
  className?: string;
}

export const WomanTables = memo(({ className }:WomanTablesProps) => {
  const { t } = useTranslation(['sizes']);

  return (
    <div className={cn(styles.root, className)}>
      <WomanBottomSizesTable title={t('sizes:woman_sizes_table_title')} data={womanBottomClothesItemJeans()} />
      <WomanBottomSizesTable title={t('sizes:woman_sizes_table_title1')} data={womanBottomClothesItem()} />
      <WomanBottomSizesTable title={t('sizes:woman_sizes_table_title4')} data={womanBottomClothesItemSport()} />
      <WomanTopSizesTable title={t('sizes:woman_sizes_table_title2')} data={womanTopClothesItem()} />
      <TShirtSizesTable title={t('sizes:woman_sizes_table_title3')} data={womanTShortItem()} />
      <BeltsSizeTable title={t('sizes:woman_sizes_table_title5')} data={beltsItem()} />
      <ArberHeightSizesTable data={arberHeightItem()} />
    </div>
  );
});
