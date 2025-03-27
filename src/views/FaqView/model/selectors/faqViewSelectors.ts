import { StoreSchema } from '@/shared/types/store';

const getCurrentTab = (state: StoreSchema) => state.faqPage?.currentTab || null;

const getCurrentQuestions = (state: StoreSchema) => state.faqPage?.currentQuestions || null;

export const faqViewSelectors = {
  getCurrentTab,
  getCurrentQuestions,
};
