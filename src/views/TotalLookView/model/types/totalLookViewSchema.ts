import { ProductSku, SmallProduct } from '@/entities/Product';

export interface TotalLookViewSchema {
  chosenProducts: SmallProduct[];
  chosenSkus: Record<string, ProductSku | null>
}
