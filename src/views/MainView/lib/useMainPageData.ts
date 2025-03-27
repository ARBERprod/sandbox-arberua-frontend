import { useGetHomePageBannersQuery, useGetHomePageBaseDataQuery } from '@/views/MainView';

export const useMainPageData = () => {
  const { data: banners, isLoading: bannersLoading, isError: bannersError } = useGetHomePageBannersQuery();
  const { data: baseData, isLoading: baseLoading, isError: baseError } = useGetHomePageBaseDataQuery();
  const isLoading = bannersLoading || baseLoading;
  const errors = {
    banners: bannersError,
    base: baseError,
  };

  return {
    banners: banners || [],
    baseCategories: baseData?.sectionCategories || [],
    sale: baseData?.sectionSale || [],
    latest: baseData?.sectionLatest || [],
    popular: baseData?.sectionPopular || [],
    collection: baseData?.sectionCollection,
    totalLook: baseData?.sectionLook,
    instagrams: baseData?.sectionInstagram || [],
    errors,
    isLoading,
  };
};
