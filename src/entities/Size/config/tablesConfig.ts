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
  WomanKnitwearData,
  WomanMainClothesData,
  ManFormalTopData,
  ManCasualJacketData,
  ManFormalTrousersData,
  ManCasualTrousersData,
  ManJeansData,
  ManKnitwearData,
  ManShirtFormalData,
} from '../model/types';

type tableColumnsGetter<T extends object> = (t: TFunction<['sizes']>) => TableColumn<T>[];

export const manBottomClothesColumns: tableColumnsGetter<ManBottomClothesUAData> = (t) => [
  {
    header: `${t('sizes:size')} EU`,
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
    header: `${t('sizes:size')} EU`,
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
    header: `${t('sizes:size')} EU`,
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
    header: `${t('sizes:size')} UA`,
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} EU`,
    accessor: 'sizes_eu',
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
    header: `${t('sizes:size')} UA`,
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} EU`,
    accessor: 'sizes_eu',
  },
  {
    header: t('sizes:hip_girth'),
    accessor: 'hip_girth',
  },
];

export const womanBottomClothesJeansColumns: tableColumnsGetter<WomanBottomClothesData> = (t) => [
  {
    header: `${t('sizes:size')} USA`,
    accessor: 'size',
  },
  {
    header: t('sizes:hip_girth'),
    accessor: 'hip_girth',
  },
];

export const tShortClothesColumns: tableColumnsGetter<TShirtData> = (t) => [
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} EU`,
    accessor: 'sizes_eu',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
];

export const womanKnitwearColumns: tableColumnsGetter<WomanKnitwearData> = (t) => [
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} EU`,
    accessor: 'sizes_eu',
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

export const womanMainClothesColumns: tableColumnsGetter<WomanMainClothesData> = (t) => [
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} EU`,
    accessor: 'sizes_eu',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
  {
    header: t('sizes:waist'),
    accessor: 'waist',
  },
  {
    header: t('sizes:hip_girth'),
    accessor: 'hip_girth',
  },
];

export const shortClothesColumns: tableColumnsGetter<ShirtData> = (t) => [
  {
    header: `${t('sizes:size')} EU`,
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
    header: t('sizes:height'),
    accessor: 'size',
  },
  {
    header: t('sizes:height_cm'),
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

export const manFormalTopColumns: tableColumnsGetter<ManFormalTopData> = (t) => [
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size_ua',
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

export const manCasualJacketColumns: tableColumnsGetter<ManCasualJacketData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size_ua',
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

export const manFormalTrousersColumns: tableColumnsGetter<ManFormalTrousersData> = (t) => [
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size_ua',
  },
  {
    header: t('sizes:waist'),
    accessor: 'waist',
  },
];

export const manCasualTrousersColumns: tableColumnsGetter<ManCasualTrousersData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size_ua',
  },
  {
    header: t('sizes:waist'),
    accessor: 'waist',
  },
];

export const manJeansColumns: tableColumnsGetter<ManJeansData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size_ua',
  },
  {
    header: t('sizes:waist'),
    accessor: 'waist',
  },
];

export const manKnitwearColumns: tableColumnsGetter<ManKnitwearData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size_ua',
  },
  {
    header: t('sizes:bust'),
    accessor: 'bust',
  },
];

export const manShirtFormalColumns: tableColumnsGetter<ManShirtFormalData> = (t) => [
  {
    header: t('sizes:size'),
    accessor: 'size',
  },
  {
    header: `${t('sizes:size')} UA`,
    accessor: 'size_ua',
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
