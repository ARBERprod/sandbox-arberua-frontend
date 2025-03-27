import {
  createContext, Dispatch, SetStateAction, useContext,
} from 'react';
import { ProductSku } from '@/entities/Product';

interface ProductSkusContextProps {
  productSkus: ProductSku[];
  chosenSku: ProductSku | null;
  setChosenSku: Dispatch<SetStateAction<ProductSku | null>>;
}

const ProductSkusContext = createContext<ProductSkusContextProps | null>(null);

export const ProductSkusContextProvider = ProductSkusContext.Provider;

export const useProductSkus = () => {
  const context = useContext(ProductSkusContext);
  if (!context) {
    throw new Error('useProductSkus must be used within a ProductSkusContextProvider');
  }

  return context;
};
