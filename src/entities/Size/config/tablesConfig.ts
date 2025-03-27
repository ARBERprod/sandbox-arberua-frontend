import { TableColumn } from '@/shared/ui/Table/types';
import { TFunction } from 'i18next';
import {
  ManTopClothesUaData,
  ManTopClothesData,
  WomanTopClothesData,
  WomanBottomClothesData,
  ShirtData,
  TShirtData,
  ArberHeightData,
  ShoesData,
  BeltsData,
  AdditionalHeightData,
  ManBottomClothesUAData,
} from '../model/types';

type tableColumnsGetter<T extends object> = (t: TFunction<['sizes']>) => TableColumn<T>[];

export const manBottomClothesColumns: tableColumnsGetter<ManBottomClothesUAData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'sizes_ua',
  },
  {
    header: t('sizes:waist'),
    accessor: 'waist',
  },
];

export const manTopClothesColumns: tableColumnsGetter<ManTopClothesData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'sizes_ua',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
];
export const manTopClothesUaColumns: tableColumnsGetter<ManTopClothesUaData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'sizes_ua',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
  {
    header: t('sizes:waist'),
    accessor: 'waist',
  },
];

export const womanTopClothesColumns: tableColumnsGetter<WomanTopClothesData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
  {
    header: t('sizes:hip_girth'),
    accessor: 'hip_girth',
  },
];

export const womanBottomClothesColumns: tableColumnsGetter<WomanBottomClothesData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: t('sizes:hip_girth'),
    accessor: 'hip_girth',
  },
];

export const tShortClothesColumns: tableColumnsGetter<TShirtData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
];

export const shortClothesColumns: tableColumnsGetter<ShirtData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'sizes_ua',
  },
  {
    header: t('sizes:neck_girth'),
    accessor: 'neck_girth',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
];

export const arberHeightClothesColumns: tableColumnsGetter<ArberHeightData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: t('sizes:height'),
    accessor: 'height',
  },
];

export const shoesClothesColumns: tableColumnsGetter<ShoesData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: t('sizes:foot_length'),
    accessor: 'shoes_height',
  },
];
export const beltsClothesColumns: tableColumnsGetter<BeltsData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: t('sizes:belts_length'),
    accessor: 'belts_length',
  },
];
export const additionalHeightColumns: tableColumnsGetter<AdditionalHeightData> = (t) => [
  {
    header: t('sizes:height'),
    accessor: 'height',
  },
  {
    header: t('sizes:height_cm'),
    accessor: 'height_cm',
  },
];
