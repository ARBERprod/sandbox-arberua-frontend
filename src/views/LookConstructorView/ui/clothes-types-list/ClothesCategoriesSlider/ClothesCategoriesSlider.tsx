import { memo } from 'react';
import cn from 'classnames';
import { Slide } from '@/shared/ui/Slider';
import { ClothesItem, ClothesSlider } from '@/entities/Product';
import { SideBarView } from '@/views/LookConstructorView/model/types/LookConstructorSchema';
import { useLookConstructorActions } from '@/views/LookConstructorView/model/slices/lookConstructorSlice';
import { clothesCategories } from '@/views/LookConstructorView/constants/mockData';
import styles from './ClothesCategoriesSlider.module.scss';

interface ClothesTypesSliderProps {
  className?: string;
}

export const ClothesCategoriesSlider = memo(({ className }:ClothesTypesSliderProps) => {
  const { setClothesCategory, setActiveView } = useLookConstructorActions();
  const slides:Slide[] = clothesCategories.map((category) => ({
    id: category.title,
    slide: (
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
    ),
  }));
  return (
    <ClothesSlider className={cn(styles.root, className)} slides={slides} />
  );
});
