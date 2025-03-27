import { FC, memo, useState } from 'react';
import cn from 'classnames';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { entityOptions } from '../../constants/entityOptions';

import styles from './ReviewTable.module.scss';
import { ProductsReviewTable } from '../ProductsReviewTable';
import { ConsultationsReviewTable } from '../ConsultationsReviewTable';
import { useTranslation } from 'next-i18next';

const tableMap: Record<'product' | 'consultant', FC<{ className?: string }>> = {
  product: ProductsReviewTable,
  consultant: ConsultationsReviewTable,
};

interface ReviewTableProps {
  className?: string;
}

export const ReviewTable = memo(({ className }: ReviewTableProps) => {
  const [chosenEntity, setChosenEntity] = useState<'product' | 'consultant'>('product');
  const { t } = useTranslation();
  const changeHandler = (name: string, value: string) => {
    setChosenEntity(value as 'product' | 'consultant');
  };

  const CurrentTable = tableMap[chosenEntity];
  return (
    <div className={cn(styles.root, className)}>
      <SelectField
        className={styles.select}
        name="entity"
        value={chosenEntity}
        onChange={changeHandler}
        options={entityOptions(t)}
      />
      <CurrentTable className={styles.table} />
    </div>
  );
});
