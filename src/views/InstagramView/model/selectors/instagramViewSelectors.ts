import { StoreSchema } from '@/shared/types/store';
import { CardView } from '@/shared/types/common';

const getView = (state:StoreSchema) => state.instagramPage?.view || CardView.BIG;

export const instagramViewSelectors = {
  getView,
};
