import { TextField } from '@/shared/ui/Form/TextField';
import { PhoneField } from '@/shared/ui/Form/PhoneField';
import { Button } from '@/shared/ui/Button';
import { useForm } from '@/shared/lib/hooks/useForm';
import { useTranslation } from 'next-i18next';
import { isValidationError } from '@/shared/types/type-guards';
import { validationErrorHandler } from '@/shared/lib/utils/validationErrorHandler';
import { usePreorderProductActions } from '../../model/preorderProductSlice';
import { PreorderProductFormData } from '../../lib/PreorderProductFormData';
import { usePreorderProductMutation } from '@/features/PreOrderProduct/api/preorderProductApi';
import { PageLoader } from '@/shared/ui/Loader';
import { useSelector } from 'react-redux';
import { preorderProductSelectors } from '@/features/PreOrderProduct/model/preorderProductSelectors';

interface PreorderProductFormProps {
  className?: string;
}

export const PreorderProductForm = ({ className }: PreorderProductFormProps) => {
  const { showSuccessModal } = usePreorderProductActions();
  const [preorderProduct, { isLoading }] = usePreorderProductMutation();
  const productId = useSelector(preorderProductSelectors.getProductId);
  const { t } = useTranslation();

  const onSubmitHandler = async (data: PreorderProductFormData) => {
    if (!productId) return;
    try {
      await preorderProduct({ ...data, product_id: productId }).unwrap();
      showSuccessModal();
    } catch (e) {
      if (isValidationError(e)) {
        validationErrorHandler(e);
      }
    }
  };

  const {
    field,
    submitHandler,
  } = useForm({
    initialState: new PreorderProductFormData(),
    onSubmit: onSubmitHandler,
  });

  return (
    <form className={className} onSubmit={submitHandler}>
      {isLoading && <PageLoader />}
      <TextField
        placeholder={t('preorder.modal.placeholder.name')}
        className="mb-3"
        {...field('user_name')}
      />
      <PhoneField
        placeholder={t('preorder.modal.placeholder.phone')}
        className="mb-4"
        {...field('phone')}
      />
      <Button color="dark" size="large" fullWidth type="submit">
        {t('preorder.modal.btn')}
      </Button>
    </form>
  );
};
