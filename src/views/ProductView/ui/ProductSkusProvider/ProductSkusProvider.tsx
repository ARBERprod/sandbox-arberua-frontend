import { ProductSkusContextProvider } from '../../lib/ProductSkusContext';
import {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { ProductSku, SizingType } from '@/entities/Product';
import { getAvailableSku } from '@/views/ProductView/lib/getAvailableSku';

interface ProductSkusProviderProps {
  children: ReactNode;
  product: {
    skus: ProductSku[] | null;
    sizing_type?: SizingType;
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
    sizingType: product.sizing_type,
  }), [chosenSku, product.skus, product.sizing_type]);

  return (
    <ProductSkusContextProvider value={providedValue}>
      {children}
    </ProductSkusContextProvider>
  );
};
