import { ImageType } from '@/shared/types/common';

export interface Faq {
  id: string;
  title: string;
  description: string;
}

export interface FaqTab {
  id: string;
  title: string;
  contents: Faq[]
  picture: ImageType;
}
