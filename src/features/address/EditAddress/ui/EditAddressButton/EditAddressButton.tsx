import { memo, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Svg } from '@/shared/ui/Svg';
import EditIcon from '@/shared/assets/icons/edit-2.svg';

import { EditAddressModal } from '../EditAddressModal/EditAddressModal';
import { Address } from '@/entities/Address';

interface EditAddressButtonProps {
  className?: string;
  address: Address;
}

export const EditAddressButton = memo(({
  className,
  address,
}: EditAddressButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickHandler = () => {
    setIsModalOpen(true);
  };
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        className={className}
        size="xsmall"
        color="icon"
        onClick={clickHandler}
      >
        <Svg Icon={EditIcon} />
      </Button>
      {isModalOpen
        && (
          <EditAddressModal
            address={address}
            onClose={closeHandler}
            isOpen={isModalOpen}
          />
        )}
    </>
  );
});
