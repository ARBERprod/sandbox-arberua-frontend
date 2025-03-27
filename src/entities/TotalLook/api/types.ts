import { SuccessApiResponseWithMeta } from '@/shared/types/api';
import { Breadcrumb } from '@/shared/ui/Breadcrumps';
import { GenderTypes } from '@/shared/types/common';
import { DetailedTotalLook, TotalLook } from '../model/types';

export type TotalLookParams = {
  page?: number;
  type?: string;
  merge?: boolean;
}

export type TotalLooksData = {
  types: GenderTypes;
  looks: TotalLook[]
}

export type TotalLooksDto = SuccessApiResponseWithMeta<TotalLooksData>;

export type TotalLookData = {
  look: DetailedTotalLook;
  breadcrumbs: Breadcrumb[];
}
