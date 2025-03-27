import { memo } from 'react';
import cn from 'classnames';
import {
  ManBottomSizesTable,
  ManTopSizesTable,
  ShirtSizesTable,
  AdditionalHeightTable,
  BeltsSizeTable, ManLightTopSizesTable,
} from '@/entities/Size';
import {
  manAdditionalHeightItemTrousers,
  manBottomSizesItemJeans,
  manAdditionalHeightItemJeans,
  manBottomSizesItemTrousers,
  manBottomSizesItemSportsTrousers,
  beltsItem,
  manTopClothesUaItemCoat,
  manAdditionalHeightItemCoat,
  manTopClothesUaItemJacket,
  manShirtSizesItem,
  manTopClothesUaItemLight,
  manTopClothesUaItemAverage,
} from '@/entities/Size/constants/dimensionalGridsData';
import styles from './ManTables.module.scss';
import { useTranslation } from 'next-i18next';

interface ManTablesProps {
  className?: string;
}

export const ManTables = memo(({ className }:ManTablesProps) => {
  const { t } = useTranslation(['sizes']);

  return (
    <div className={cn(styles.root, className)}>
      <ManBottomSizesTable title={t('sizes:man_sizes_table_title')} data={manBottomSizesItemTrousers()} />
      <AdditionalHeightTable data={manAdditionalHeightItemTrousers()} />
      <ManBottomSizesTable title={t('sizes:man_sizes_table_title1')} data={manBottomSizesItemJeans()} />
      <AdditionalHeightTable data={manAdditionalHeightItemJeans()} />
      <ManBottomSizesTable title={t('sizes:man_sizes_table_title6')} data={manBottomSizesItemSportsTrousers()} />
      <BeltsSizeTable title={t('sizes:man_sizes_table_title7')} data={beltsItem()} />
      <ManTopSizesTable title={t('sizes:man_sizes_table_title2')} data={manTopClothesUaItemCoat()} />
      <AdditionalHeightTable data={manAdditionalHeightItemCoat()} />
      <ManTopSizesTable title={t('sizes:man_sizes_table_title3')} data={manTopClothesUaItemJacket()} />
      <ShirtSizesTable title={t('sizes:man_sizes_table_title8')} data={manShirtSizesItem()} />
      <ManLightTopSizesTable title={t('sizes:man_sizes_table_title4')} data={manTopClothesUaItemLight()} />
      <ManLightTopSizesTable title={t('sizes:man_sizes_table_title5')} data={manTopClothesUaItemAverage()} />
    </div>
  );
});
