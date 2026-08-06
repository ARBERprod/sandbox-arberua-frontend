import type { SuccessApiResponse, SuccessApiResponseWithMeta } from '@/shared/types/api';
// `import type` on both ends of the Product↔Collaboration link: the barrels are mutually
// dependent and both carry runtime exports, so a value import would put the cycle into the bundle.
import type { Product } from '@/entities/Product';
import type { Breadcrumb } from '@/shared/ui/Breadcrumps';
import type { FilterItem } from '@/entities/Filter';
import type { SortOption } from '@/shared/types/common';
import type { Collaboration, CollaborationDetails } from '../model/types/Collaboration';

export type CollaborationsData = {
  collaborations: Collaboration[];
};

export type CollaborationsDto = SuccessApiResponse<CollaborationsData>;

export type CollaborationData = {
  collaboration: CollaborationDetails;
  products: Product[];
  breadcrumbs: Breadcrumb[];
  filter: FilterItem[];
  sorter: SortOption[];
};

export type CollaborationSingleDto = SuccessApiResponseWithMeta<CollaborationData>;
