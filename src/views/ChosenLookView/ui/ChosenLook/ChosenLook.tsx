import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import { getMockSmallProducts } from '@/entities/Product';
import { FlexCol } from '@/shared/ui/Flex';
import { useMockArray } from '@/shared/lib/hooks/mock/useMockArray';
import { useTranslation } from 'next-i18next';
import { ChosenLookItem } from '../ChosenLookItem';
import styles from './ChosenLook.module.scss';

interface ChosenLookProps {
  className?: string;
}

export const ChosenLook = memo(({ className }: ChosenLookProps) => {
  const products = useMockArray(getMockSmallProducts());
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <FlexCol gap="16" className={styles.list}>
        {products.slice(0, 3)
          .map((product) => <ChosenLookItem product={product} key={product.id} />)}
      </FlexCol>
      <Button size="large" className={styles.btn}>{t('buy-look-all.btn')}</Button>
    </div>
  );
});
