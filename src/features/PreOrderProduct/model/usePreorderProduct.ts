import { usePreorderProductActions } from './preorderProductSlice';

export const usePreorderProduct = () => {
  const { setProductId, openModal } = usePreorderProductActions();
  const openPreorderProductModal = (productId: string) => {
    setProductId(productId);
    openModal();
  };

  return {
    openPreorderProductModal,
  };
};
