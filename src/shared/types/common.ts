import { FC, SVGProps } from 'react';
import { StaticImageData } from 'next/image';
import { COLORS } from '@/shared/config/colors';

export type SvgType = FC<SVGProps<SVGSVGElement>>

export type ImageType = string | StaticImageData | null;

export interface SocialLink {
  href: string;
  Icon: SvgType;
  stroke?: keyof typeof COLORS | 'none' | string;
  fill?: keyof typeof COLORS | 'none';
}

export type AnyFunction = (...args: any[]) => any;

export type ObjectType = Record<string, any>;

export enum CardView {
  SMALL = 'small',
  NORMAL = 'normal',
  BIG = 'big',
}

export interface SeoData {
  [key: string]: ObjectType;
}

export type WithSeo<T> = T & { seo: SeoData };

export type BannerMediaType = 'image' | 'video';

export type Primitive = string | number | boolean | null;

export type SortOption = {
  title: string;
  value: string | null;
}
export type GenderType = {
  title: string;
  value: string;
}

export type GenderTypes = {
  man: GenderType;
  women: GenderType;
}

export type Price = {
  value: number;
  symbol: string;
};

export type FieldProps = {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}
