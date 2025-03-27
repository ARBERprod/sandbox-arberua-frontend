import { memo } from 'react';
import { FlexCol } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { useConfirmModal } from '@/shared/lib/components/ConfirmModalProvider';
import DeleteIcon from '@/shared/assets/icons/delete-2.svg';
import { Button } from '@/shared/ui/Button';
import { Svg } from '@/shared/ui/Svg';
import { useDeleteAddressMutation } from '@/entities/Address';
import { PageLoader } from '@/shared/ui/Loader';
import { useTranslation } from 'next-i18next';

interface DeleteAddressButtonProps {
  className?: string;
  addressId: string;
  addressTitle: string;
}

export const DeleteAddressButton = memo(({
  className,
  addressId,
  addressTitle,
}: DeleteAddressButtonProps) => {
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();
  const { withConfirm } = useConfirmModal();
  const { t } = useTranslation();

  const clickHandler = withConfirm({
    onAccept: () => {
      deleteAddress({ addressId });
    },
    content: (
      <FlexCol gap="8" align="center">
        <Typography variant="title-5">
          {t('want-to-delete-the-address')}
        </Typography>
        <Typography variant="title-5" weight={500}>{addressTitle}</Typography>
      </FlexCol>
    ),
  });

  return (
    <>
      {isLoading && <PageLoader />}
      <Button size="xsmall" color="icon" className={className} onClick={clickHandler}>
        <Svg Icon={DeleteIcon} />
      </Button>
    </>
  );
});
