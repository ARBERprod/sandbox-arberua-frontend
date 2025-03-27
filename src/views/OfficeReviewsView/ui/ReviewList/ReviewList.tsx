import { FC, memo, useState } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
import { SelectField } from '@/shared/ui/Form/SelectField';
import { noop } from '@/shared/lib/utils/noop';
import { entityOptions } from '../../constants/entityOptions';
import styles from './ReviewList.module.scss';
import { ReviewProductsList } from '../ReviewProductsList';
import { ReviewConsultationsList } from '../ReviewConsultationsList';
import { useTranslation } from 'next-i18next';

const listMap: Record<'product' | 'consultant', FC<{ className?: string }>> = {
  product: ReviewProductsList,
  consultant: ReviewConsultationsList,
};

interface ReviewListProps {
  className?: string;
}

export const ReviewList = memo(({ className }:ReviewListProps) => {
  const [chosenEntity, setChosenEntity] = useState<'product' | 'consultant'>('product');
  const { t } = useTranslation();
  const changeHandler = (name: string, value: string) => {
    setChosenEntity(value as 'product' | 'consultant');
  };
  const CurrentList = listMap[chosenEntity];
  return (
    <div className={cn(styles.root, className)}>
      <Flex gap="8">
        <SelectField
          className="w-full"
          name="entity"
          value={chosenEntity}
          onChange={changeHandler}
          options={entityOptions(t)}
        />
        <SelectField
          className="w-full"
          name="sort"
          value=""
          onChange={noop}
          options={[]}
        />
      </Flex>
      <CurrentList className="mt-4" />
    </div>
  );
});
