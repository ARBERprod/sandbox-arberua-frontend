import { Faq } from './types';

export interface FaqViewSchema {
  currentTab: string | null;
  currentQuestions: Faq[] | null;
}
