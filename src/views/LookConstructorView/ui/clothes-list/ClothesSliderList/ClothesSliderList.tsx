import { memo } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { ClothesSlider, ClothesItem } from '@/entities/Product';
import { useTranslation } from 'next-i18next';
import { useClothesList } from '../../../lib/useClothesList';
import styles from './ClothesSliderList.module.scss';

interface ClothesSliderProps {
  className?: string;
}

export const ClothesSliderList = memo(({ className }: ClothesSliderProps) => {
  const {
    clothes,
    showRemoveButton,
    removeClothesHandler,
    isItemActive,
    itemClickHandler,
    goToTypesList,
  } = useClothesList();
  const { t } = useTranslation();
  const slides = clothes.map((item) => ({
    id: item.id,
    slide: (
      <ClothesItem
        key={item.id}
        image={item.preview}
        active={isItemActive(item.id)}
        onClick={() => itemClickHandler({ id: item.id, image: item.image })}
        size="md"
      />
    ),
  }));
  return (
    <div className={cn(styles.root, className)}>
      <ClothesSlider slides={slides} onRemove={removeClothesHandler} withRemoveButton={showRemoveButton} />
      <Container className={styles.container}>
        <Flex align="center" justify="between" className="mt-3">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <Typography>{t('jackets')}</Typography>
          <Button onClick={goToTypesList} className={styles.btn}>{t('further')}</Button>
        </Flex>
      </Container>
    </div>
  );
});
