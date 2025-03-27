import { StoreSchema } from '@/shared/types/store';
import { createSelector } from 'reselect';
import { ClothesCategory, SideBarView } from '../types/LookConstructorSchema';

const getChosenType = (state: StoreSchema) => state.lookConstructor?.chosenCategory || null;
const getActiveSidebarView = (state: StoreSchema) => state.lookConstructor?.activeSidebarView
  || SideBarView.CLOTHES_TYPES_LIST;
const getChosenClothes = (state: StoreSchema) => state.lookConstructor?.chosenClothes || {
  [ClothesCategory.JACKET]: null,
  [ClothesCategory.BASE]: null,
  [ClothesCategory.SHOES]: null,
  [ClothesCategory.TROUSERS]: null,
  [ClothesCategory.COAT]: null,
};
const getClothesByType = (type: ClothesCategory) => (state: StoreSchema) => state.lookConstructor?.chosenClothes[type]
  || null;
const getClothesImageByType = (
  type: ClothesCategory,
) => (state: StoreSchema) => state.lookConstructor?.chosenClothes[type]?.image
  || null;

const getClothesImages = createSelector(
  getChosenClothes,
  (clothes) => ({
    [ClothesCategory.JACKET]: clothes[ClothesCategory.JACKET]?.image || null,
    [ClothesCategory.BASE]: clothes[ClothesCategory.BASE]?.image || null,
    [ClothesCategory.SHOES]: clothes[ClothesCategory.SHOES]?.image || null,
    [ClothesCategory.TROUSERS]: clothes[ClothesCategory.TROUSERS]?.image || null,
    [ClothesCategory.COAT]: clothes[ClothesCategory.COAT]?.image || null,
  }),
);
export const lookConstructorSelectors = {
  getChosenType,
  getActiveSidebarView,
  getClothesImageByType,
  getClothesImages,
  getClothesByType,
  getChosenClothes,
};
