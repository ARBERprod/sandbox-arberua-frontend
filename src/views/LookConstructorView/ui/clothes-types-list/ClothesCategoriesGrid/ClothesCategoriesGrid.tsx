import { memo } from 'react';
import cn from 'classnames';
import { ClothesItem } from '@/entities/Product';
import { useLookConstructorActions } from '../../../model/slices/lookConstructorSlice';
import { SideBarView } from '../../../model/types/LookConstructorSchema';
import { clothesCategories } from '../../../constants/mockData';
import styles from './ClothesCategoriesGrid.module.scss';

interface ClothesTypesGridProps {
  className?: string;
}

export const ClothesCategoriesGrid = memo(({ className }: ClothesTypesGridProps) => {
  const { setClothesCategory, setActiveView } = useLookConstructorActions();
  return (
    <div className={styles.root}>
      <div className={cn(styles.grid, className)}>
        {
          clothesCategories.map((category) => (
            <ClothesItem
              key={category.type}
              image={category.src}
              text={category.title}
              onClick={() => {
                setClothesCategory(category.type);
                setActiveView(SideBarView.CLOTHES_LIST);
              }}
              size="md"
            />
          ))
        }
      </div>
    </div>
  );
});
