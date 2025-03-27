import { SliderData } from '@/views/MainView/api/types';
import { ManWomanTab } from '@/shared/ui/ManWomanSwitcherButtons';
import { useCallback, useMemo, useState } from 'react';
import { routerPaths } from '@/shared/config/router';

export const useSectionData = (sliderData2:SliderData[]) => {
  const sliderData = useMemo(() => (sliderData2 ? [...sliderData2].reverse() : []), [sliderData2]);
  const tabs:ManWomanTab[] = useMemo(() => sliderData.map((sliderItem) => ({
    title: sliderItem.title,
    slug: sliderItem.url,
  })), [sliderData]);

  const [chosenTab, setChosenTab] = useState(sliderData[0]?.url || '');

  const getHref = useCallback(() => {
    const activeSliderItem = sliderData.find((item) => item.url === chosenTab);
    if (!activeSliderItem) return routerPaths.main;
    return activeSliderItem.url;
  }, [chosenTab, sliderData]);

  const getProducts = useCallback(() => {
    const activeSliderItem = sliderData.find((item) => item.url === chosenTab);
    if (!activeSliderItem) return [];
    return activeSliderItem.products;
  }, [chosenTab, sliderData]);

  const products = useMemo(() => getProducts(), [getProducts]);
  const href = useMemo(() => getHref(), [getHref]);
  const onTabChange = useCallback((tab: string) => setChosenTab(tab), []);

  return {
    tabs,
    chosenTab,
    products,
    href,
    onTabChange,
  };
};
