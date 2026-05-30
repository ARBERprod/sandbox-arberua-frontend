import { GalleryImage, ImageType, Price } from '@/shared/types/common';
import { Shop } from '@/entities/Shop';

export type SizingType = 'man' | 'woman' | 'shoes';

export interface Material {
  title: string;
}

export type ProductSku = {
  id: string;
  title: string;
  is_sale: boolean;
  old_price: Price | null;
  price: Price;
  bonus_can_be_written_off: number | any
  identifier_sync: string;
}

export interface SmallProduct {
  id: string;
  url: string;
  title: string;
  picture: ImageType;
  skus: ProductSku[];
  price: Price;
  category: string;
  brand: string;
  old_price: Price | false;
  wishlists_count: number;
}

export interface Product {
  id: string;
  parent_id: string;
  url: string;
  title: string;
  price: Price;
  old_price: Price | false;
  skus: ProductSku[] | null;
  pictures: ImageType[];
  wishlists_count: number;
  brand: string;
  category: string;
  discount?: string;
}

export type ProductColorVariant = {
  id: string;
  url: string;
  color_value: string;
  color_title: string;
  is_current: boolean;
  is_available: boolean;
};

export interface DetailedProduct {
  id: string;
  parent_id: string;
  url: string;
  title: string;
  description: string | null;
  article: string;
  bonus_accrual: number | null;
  bonus_can_be_written_off: number | null;
  comments: {
    count: number;
    rating: number | false;
  }
  category: string;
  brand: string;
  is_sale: boolean;
  pictures: GalleryImage[];
  materials: Material[];
  wishlists_count: number;
  price: Price;
  old_price: Price | false;
  skus: ProductSku[] | null;
  sizing_type: SizingType;
  color_variants: ProductColorVariant[];
}

export type ProductQuantity = {
  id: string;
  title: string;
  stores: Shop[];
}

export type ProductPickerSize = {
  title: string;
  url: string;
};

export type ProductPickerColor = {
  url: string;
  value: string;
  title?: string; // tooltip / aria-label
  isAvailable?: boolean; // false → dimmed
};
