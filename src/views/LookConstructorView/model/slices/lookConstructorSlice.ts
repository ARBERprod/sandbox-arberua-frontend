import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ImageType } from '@/shared/types/common';
import { ClothesCategory, LookConstructorSchema, SideBarView } from '../types/LookConstructorSchema';

const initialState: LookConstructorSchema = {
  activeSidebarView: SideBarView.CLOTHES_TYPES_LIST,
  chosenCategory: null,
  chosenClothes: {
    [ClothesCategory.JACKET]: null,
    [ClothesCategory.SHOES]: null,
    [ClothesCategory.TROUSERS]: null,
    [ClothesCategory.BASE]: null,
    [ClothesCategory.COAT]: null,
  },
};

const lookConstructorSlice = buildSlice({
  name: 'lookConstructor',
  initialState,
  reducers: {
    setClothesCategory: (state, action: PayloadAction<ClothesCategory>) => {
      state.chosenCategory = action.payload;
    },
    setActiveView: (state, action: PayloadAction<SideBarView>) => {
      state.activeSidebarView = action.payload;
    },
    setClothesByType: (
      state,
      action: PayloadAction<{
        type: ClothesCategory,
        clothes: { id: string, image: ImageType } | null
      }>,
    ) => {
      state.chosenClothes[action.payload.type] = action.payload.clothes;
    },
    removeClothesByType: (state, action: PayloadAction<{ type: ClothesCategory }>) => {
      state.chosenClothes[action.payload.type] = null;
    },
  },
});

export const { useActions: useLookConstructorActions, reducer: lookConstructorReducer } = lookConstructorSlice;
