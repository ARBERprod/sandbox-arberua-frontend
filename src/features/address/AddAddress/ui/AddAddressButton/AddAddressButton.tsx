import { memo, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { useTranslation } from 'next-i18next';
import { AddAddressModal } from '../AddAddressModal';

interface AddAddressButtonProps {
  className?: string;
}

export const AddAddressButton = memo(({ className }: AddAddressButtonProps) => {
  const { t } = useTranslation('office-page');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  const clickHandler = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Button
        className={className}
        color="light-secondary"
        size="mediumlarge"
        onClick={clickHandler}
      >
        {t('addAddress')}
      </Button>
      <AddAddressModal isOpen={isModalOpen} onClose={closeHandler} />
    </>
  );
});
