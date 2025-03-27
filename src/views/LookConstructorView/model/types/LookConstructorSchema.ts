import { ImageType } from '@/shared/types/common';

export enum SideBarView {
  CLOTHES_TYPES_LIST = 'clothes-types-list',
  CLOTHES_LIST = 'clothes-list',
}

export enum ClothesCategory {
  TROUSERS = 'trousers',
  SHOES = 'shoes',
  JACKET = 'jacket',
  BASE = 'base',
  COAT = 'coat'
}

export interface LookConstructorSchema {
  activeSidebarView: SideBarView;
  chosenCategory: ClothesCategory | null;
  chosenClothes: {
    [ClothesCategory.TROUSERS]: { id: string; image: ImageType } | null;
    [ClothesCategory.BASE]: { id: string; image: ImageType } | null;
    [ClothesCategory.JACKET]: { id: string; image: ImageType } | null;
    [ClothesCategory.SHOES]: { id: string; image: ImageType } | null;
    [ClothesCategory.COAT]: { id: string; image: ImageType } | null;
  }
}
