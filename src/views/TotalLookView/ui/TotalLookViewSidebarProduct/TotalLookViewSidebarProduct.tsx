import {
  getItemPrices,
  ProductCardWithCheckbox, ProductSku, ProductSkus, SmallProduct,
} from '@/entities/Product';
import { useSelector } from 'react-redux';
import { totalLookViewSelectors } from '../../model/selectors/totalLookViewSelectors';
import { useTotalLookViewActions } from '../../model/slices/totalLookViewSlice';

interface TotalLookViewSidebarProductProps {
  className?: string;
  product: SmallProduct;
}

export const TotalLookViewSidebarProduct = ({
  className,
  product,
}: TotalLookViewSidebarProductProps) => {
  const {
    appendProduct,
    removeProduct,
    selectSku,
  } = useTotalLookViewActions();
  const chosenProducts = useSelector(totalLookViewSelectors.getChosenProducts);
  const chosenSku = useSelector(totalLookViewSelectors.getProductChosenSku(product.id));
  const { price, oldPrice } = getItemPrices(product, chosenSku);

  const onChangeHandler = (product: SmallProduct, value: boolean) => {
    if (value) {
      appendProduct(product);
    } else {
      removeProduct(product);
    }
  };
  const skuClickHandler = (sku: ProductSku) => {
    selectSku({
      productId: product.id,
      sku,
    });
  };
  return (
    <ProductCardWithCheckbox
      className={className}
      product={{ ...product, price, old_price: oldPrice }}
      value={chosenProducts.some((p) => p.id === product.id)}
      onChange={onChangeHandler}
      actions={(
        <ProductSkus
          activeSkuId={chosenSku?.id}
          onClick={skuClickHandler}
          disableIfIsNotSale
          skus={product.skus}
        />
      )}
    />
  );
};
