import { memo } from 'react';
import cn from 'classnames';
import {
  AdditionalHeightTable,
  BeltsSizeTable,
  ManSuitsSizesTable,
  ManCasualJacketSizesTable,
  ManJacketsSizesTable,
  ManTrousersSizesTable,
  ManCasualTrousersSizesTable,
  ManJeansSizesTable,
  ManKnitwearSizesTable,
  ManShirtFormalSizesTable,
} from '@/entities/Size';
import {
  beltsItem,
  manSuitsItem,
  manCasualJacketsItem,
  manSuitsHeightItem,
  manJacketsItem,
  manTrousersItem,
  manCasualTrousersItem,
  manCasualTrousersHeightItem,
  manJeansNewItem,
  manJeansHeightItem,
  manKnitwearItem,
  manTShirtsItem,
  manSportsPantsItem,
  manShirtsNewItem,
  manCasualShirtsItem,
} from '@/entities/Size/constants/dimensionalGridsData';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import styles from './ManTables.module.scss';

interface ManTablesProps {
  className?: string;
}

export const ManTables = memo(({ className }: ManTablesProps) => {
  const { t } = useTranslation(['sizes']);

  return (
    <div className={cn(styles.root, className)}>
      <Typography className={styles.notification}>
        {t('sizes:man_sizes_notice')}
      </Typography>

      <ManSuitsSizesTable title={t('sizes:man_suits_title')} data={manSuitsItem()} />
      <ManCasualJacketSizesTable title={t('sizes:man_casual_jackets_title')} data={manCasualJacketsItem()} />
      <AdditionalHeightTable data={manSuitsHeightItem()} />

      <ManJacketsSizesTable title={t('sizes:man_jackets_title')} data={manJacketsItem()} />

      <ManTrousersSizesTable title={t('sizes:man_trousers_title')} data={manTrousersItem()} />
      <ManCasualTrousersSizesTable title={t('sizes:man_casual_trousers_title')} data={manCasualTrousersItem()} />
      <AdditionalHeightTable data={manCasualTrousersHeightItem()} />

      <ManJeansSizesTable title={t('sizes:man_jeans_title')} data={manJeansNewItem()} />
      <AdditionalHeightTable data={manJeansHeightItem()} />

      <ManKnitwearSizesTable title={t('sizes:man_knitwear_title')} data={manKnitwearItem()} />
      <ManKnitwearSizesTable title={t('sizes:man_tshirts_title')} data={manTShirtsItem()} />

      <ManCasualTrousersSizesTable title={t('sizes:man_sports_pants_title')} data={manSportsPantsItem()} />

      <ManShirtFormalSizesTable title={t('sizes:man_shirts_title')} data={manShirtsNewItem()} />
      <ManKnitwearSizesTable title={t('sizes:man_casual_shirts_title')} data={manCasualShirtsItem()} />

      <BeltsSizeTable title={t('sizes:man_belts_title')} data={beltsItem()} />
    </div>
  );
});
