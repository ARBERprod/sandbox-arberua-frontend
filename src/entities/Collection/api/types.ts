import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Product } from '@/entities/Product';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { GenderTypes, SortOption } from '@/shared/types/common';
import { Collection } from '../model/types/Collection';
import { FilterItem } from '@/entities/Filter';

export type CollectionsDto = {
  collections: Collection[];
  breadcrumbs: Breadcrumb[];
  types: GenderTypes;
};

export type CollectionData = {
  collection: {
    id: string;
    title: string;
    description: string;
    url: boolean;
  },
  products: Product[];
  breadcrumbs: Breadcrumb[];
  filter: FilterItem[];
  sorter: SortOption[];
}

export type CollectionSingleDto = SuccessApiResponseWithMeta<CollectionData>;
