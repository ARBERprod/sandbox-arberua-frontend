import { memo } from 'react';
import cn from 'classnames';
import {
  ArberHeightSizesTable,
  WomanKnitwearSizesTable,
  WomanMainSizesTable,
  BeltsSizeTable,
} from '@/entities/Size';
import {
  arberHeightItem,
  beltsItem,
  womanKnitwearItem,
  womanMainClothesItem,
} from '@/entities/Size/constants/dimensionalGridsData';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import styles from './WomanTables.module.scss';

interface WomanTablesProps {
  className?: string;
}

export const WomanTables = memo(({ className }: WomanTablesProps) => {
  const { t } = useTranslation(['sizes']);

  return (
    <div className={cn(styles.root, className)}>
      <Typography className={styles.notification}>
        {t('sizes:woman_sizes_notice')}
      </Typography>

      <WomanKnitwearSizesTable
        title={t('sizes:woman_knitwear_title')}
        data={womanKnitwearItem()}
      />

      <div className={styles.tableGroup}>
        <WomanMainSizesTable
          title={t('sizes:woman_main_clothes_title')}
          data={womanMainClothesItem()}
        />
        <ArberHeightSizesTable data={arberHeightItem()} />
      </div>

      <BeltsSizeTable title={t('sizes:woman_sizes_table_title5')} data={beltsItem()} />
    </div>
  );
});
