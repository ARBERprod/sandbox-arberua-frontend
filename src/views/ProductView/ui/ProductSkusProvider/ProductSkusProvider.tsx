import { ProductSkusContextProvider } from '../../lib/ProductSkusContext';
import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { ProductSku } from '@/entities/Product';
import { getAvailableSku } from '@/views/ProductView/lib/getAvailableSku';

interface ProductSkusProviderProps {
  children: ReactNode;
  product: {
    skus: ProductSku[] | null;
  };
}

export const ProductSkusProvider = ({
  children,
  product,
}: ProductSkusProviderProps) => {
  const [chosenSku, setChosenSku] = useState<ProductSku | null>(() => getAvailableSku(product));

  useEffect(() => {
    setChosenSku(getAvailableSku(product));
  }, [product]);

  const providedValue = useMemo(() => ({
    productSkus: product.skus || [],
    setChosenSku,
    chosenSku,
  }), [chosenSku, product.skus]);

  return (
    <ProductSkusContextProvider value={providedValue}>
      {children}
    </ProductSkusContextProvider>
  );
};
