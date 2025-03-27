import { Product } from '@/entities/Product';
import {
  BannerMediaType, GenderTypes, ImageType,
} from '@/shared/types/common';
import { SuccessApiResponse } from '@/shared/types/api';
import { Instagram } from '@/entities/InstagramFeedback';
import { StaticImageData } from 'next/image';

export type SliderData = {
  id: string;
  title: string;
  url: string;
  products: Product[];
}

export type BannerCategory = {
  title: string;
  url: string;
}

export type BannerItem = {
  url: ImageType & string & StaticImageData;
  type: BannerMediaType;
  link?: string;
  mobileUrl?: ImageType & string & StaticImageData;
  tabletUrl?: ImageType & string & StaticImageData;
  translations?: {
    [lang: string]: {
      picture_desktop?: File | null;
      picture_tablet?: File | null;
      picture_mobile?: File | null;
    };
  };
}

export type MainPageDto = {
  latest: SliderData[];
  banner: BannerItem[];
  categories: [BannerCategory, BannerCategory];
  sales: SliderData;
  popular: SliderData;
}

export type BaseData = {
  sectionCategories: BannerCategory[];
  sectionLatest: SliderData[];
  sectionSale: SliderData[];
  sectionPopular: SliderData[];
  sectionCollection: GenderTypes;
  sectionLook: GenderTypes;
  sectionInstagram: Instagram[];
}

export type BaseDataDto = SuccessApiResponse<BaseData>;

export type BannersDto = SuccessApiResponse<BannerItem[]>;
