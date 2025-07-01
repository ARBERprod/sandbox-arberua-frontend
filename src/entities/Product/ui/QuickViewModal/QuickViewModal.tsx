import { ReactElement, useState } from 'react';
import { Product, ProductSku } from '../../model/types';
import { getItemPrices, ProductSkus } from '@/entities/Product';
import { Button } from '@/shared/ui/Button';
import { ItemPrice } from '@/shared/ui/ItemPrice';
import { useRouter } from 'next/router';
import { OverlayingModal } from '@/shared/ui/Modal/OverlayingModal';
import styles from './QuickViewModal.module.scss';
import { Svg } from '@/shared/ui/Svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { useTranslation } from 'next-i18next';
import { AppImage } from '@/shared/ui/AppImage';
import { SizeGridButton } from '@/features/ShowSizeGrid';
import { Typography } from '@/shared/ui/Typography';

interface ActionProps {
  productId: string;
}

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  cartActions?: (props: ActionProps) => ReactElement;
}

export const QuickViewModal = ({
  isOpen,
  onClose,
  product,
  cartActions,
}: QuickViewModalProps & { cartActions?: (props: ActionProps) => ReactElement }) => {
  const [selectedSku, setSelectedSku] = useState<ProductSku | null>(null);
  const router = useRouter();
  const { price, oldPrice } = getItemPrices(product, selectedSku);
  const { t } = useTranslation();

  return (
    <OverlayingModal
      isOpen={isOpen}
      onClose={onClose}
      fullScreenMobile
      centered
      rootClassName={styles.quickViewRoot}
    >
      <div role="presentation" className={styles.modal} onClick={onClose}>
        <div role="presentation" className={styles.container} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeBtn} onClick={onClose}>
            <Svg Icon={CloseIcon} stroke="grey" width={16} height={16} />
          </button>
          <h3 className={styles.modalTitle}>
            {t('quick_view_title')}
          </h3>
          <div className={styles.block}>
            <AppImage width={82} height={104} src={product.pictures[0]} alt={product.title} />
            <div className={styles.content}>
              <h2 className={styles.title}>
                {product.title}
              </h2>
              <div className={styles.priceBlock}>
                <ItemPrice price={price} oldPrice={oldPrice} />
              </div>
            </div>
          </div>

          <div className={styles.sizes}>
            <Typography variant="body-2">
              {t('size')}
              :
            </Typography>
            <SizeGridButton variant="icon" />
          </div>
          <ProductSkus
            hideNotSaleVariants
            disableIfIsNotSale
            skus={product.skus || []}
            activeSkuId={selectedSku?.id || null}
            className={styles.skus}
            onClick={(sku) => setSelectedSku(sku)}
          />
          <div className={styles.actions}>
            <div className={styles.addToCartMob}>
              {cartActions?.({ productId: selectedSku?.id || product.id })}
            </div>
            <Button
              fullWidth
              className={styles.link}
              onClick={() => {
                router.push(product.url);
                onClose();
              }}
            >
              {t('quick_view_more')}
            </Button>
          </div>
        </div>
      </div>
    </OverlayingModal>
  );
};
