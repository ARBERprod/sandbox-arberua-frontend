import { memo } from 'react';
import { MainSlider, Slide } from '@/shared/ui/Slider';
import cn from 'classnames';
import { Product } from '@/entities/Product';
import { SingleProductCard } from '../SingleProductCard';
import styles from './ProductSlider.module.scss';

interface ProductSliderProps {
  className?: string;
  products: Product[];
  slidesPerView?: number | 'auto';
  notFullWidthOnMobile?: boolean;
  navigationMode?: 'normal' | 'wide';
  onAddProductToCart?: () => void;
}

export const ProductSlider = memo(({
  products = [],
  slidesPerView = 'auto',
  notFullWidthOnMobile = false,
  navigationMode = 'normal',
  onAddProductToCart,
  className,
}:ProductSliderProps) => {
  const slides:Slide[] = products.map((product) => ({
    id: product.id,
    slide: (
      <SingleProductCard
        className={cn(styles.product, {
          [styles.product_primary]: slidesPerView !== 'auto',
        })}
        onAddProductToCart={onAddProductToCart}
        product={product}
        key={product.id}
      />
    ),
  }));

  return (
    <MainSlider
      slides={slides}
      className={cn(styles.root, className)}
      classes={{
        slide: cn(
          styles.slide,
          { [styles.slide_primary]: slidesPerView !== 'auto' },
        ),
      }}
      slidesPerView={slidesPerView}
      notFullWidthOnMobile={notFullWidthOnMobile}
      navigationMode={navigationMode}
      navigationOffset="top"
    />
  );
});
