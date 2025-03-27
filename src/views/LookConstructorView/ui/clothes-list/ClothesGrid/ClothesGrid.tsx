import { memo } from 'react';
import cn from 'classnames';
import { Button } from '@/shared/ui/Button';
import CrossIcon from '@/shared/assets/icons/close.svg';
import { Svg } from '@/shared/ui/Svg';
import { ClothesItem } from '@/entities/Product';
import { useTranslation } from 'next-i18next';
import { useClothesList } from '../../../lib/useClothesList';
import styles from './ClothesGrid.module.scss';

interface ClothesGridProps {
  className?: string;
}

export const ClothesGrid = memo(({ className }: ClothesGridProps) => {
  const {
    clothes, removeClothesHandler, isItemActive, itemClickHandler, goToTypesList, showRemoveButton,
  } = useClothesList();
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      {showRemoveButton
      && (
        <button onClick={removeClothesHandler} type="button" className={styles.removeBtn}>
          <Svg width={10} height={10} Icon={CrossIcon} stroke="grey-dark" />
        </button>
      )}
      <div className={styles.grid}>
        {clothes.map((clothesItem) => (
          <ClothesItem
            key={clothesItem.id}
            active={isItemActive(clothesItem.id)}
            image={clothesItem.preview}
            onClick={() => {
              itemClickHandler({ id: clothesItem.id, image: clothesItem.image });
            }}
            size="sm"
          />
        ))}
      </div>
      <Button className={styles.btn} onClick={goToTypesList}>{t('further')}</Button>
    </div>
  );
});
