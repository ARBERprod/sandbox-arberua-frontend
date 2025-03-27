import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { ImageType } from '@/shared/types/common';
import {
  MOCK_BASE, MOCK_COAT, MOCK_JACKETS, MOCK_SHOES, MOCK_TROUSERS,
} from '@/views/LookConstructorView/constants/mockData';
import { useLookConstructorActions } from '../model/slices/lookConstructorSlice';
import { lookConstructorSelectors } from '../model/selectors/lookConstructorSelectors';
import { ClothesCategory, SideBarView } from '../model/types/LookConstructorSchema';
import { Clothes } from '../model/types/Clothes';

const clothesMap: Record<ClothesCategory, Clothes[]> = {
  [ClothesCategory.JACKET]: MOCK_JACKETS,
  [ClothesCategory.TROUSERS]: MOCK_TROUSERS,
  [ClothesCategory.BASE]: MOCK_BASE,
  [ClothesCategory.SHOES]: MOCK_SHOES,
  [ClothesCategory.COAT]: MOCK_COAT,
};

export const useClothesList = () => {
  const { setActiveView, setClothesByType, removeClothesByType } = useLookConstructorActions();
  const chosenType = useSelector(lookConstructorSelectors.getChosenType) as ClothesCategory;
  const activeClothes = useSelector(lookConstructorSelectors.getChosenClothes);

  const goToTypesList = () => {
    setActiveView(SideBarView.CLOTHES_TYPES_LIST);
  };

  const removeClothesHandler = () => {
    removeClothesByType({ type: chosenType });
  };
  const clothes = useMemo(() => {
    if (!chosenType) return [];
    return clothesMap[chosenType];
  }, [chosenType]);
  const isItemActive = (id: string) => activeClothes[chosenType]?.id === id;
  const itemClickHandler = (clothes: {id: string, image: ImageType}) => {
    setClothesByType({ type: chosenType, clothes });
  };
  const showRemoveButton = chosenType === ClothesCategory.JACKET || chosenType === ClothesCategory.COAT;
  return {
    removeClothesHandler,
    goToTypesList,
    clothes,
    showRemoveButton,
    isItemActive,
    itemClickHandler,
  };
};
