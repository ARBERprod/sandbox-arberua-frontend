import { StoreSchema } from '@/shared/types/store';

const getIsAuth = (state: StoreSchema) => Boolean(state.session.userData);
const getUserData = (state: StoreSchema) => state.session.userData;
const getUserCity = (state: StoreSchema) => state.session.city;
const getIsSessionDataLoaded = (state: StoreSchema) => state.session.isLoaded;
const getIsSessionDataFetching = (state: StoreSchema) => state.session.isFetching;
const getIsPopupShowed = (state: StoreSchema) => state.session.isPopupShowed;

export const sessionSelectors = {
  getIsAuth,
  getUserData,
  getIsSessionDataLoaded,
  getIsSessionDataFetching,
  getUserCity,
  getIsPopupShowed,
};
