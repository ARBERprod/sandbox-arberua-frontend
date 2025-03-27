import { memo } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { Flex } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import { EditableAddressItem, getFullAddress } from '@/entities/Address';
import { EditAddressButton } from '@/features/address/EditAddress';
import { DeleteAddressButton } from '@/features/address/DeleteAddress';
import { AddAddressButton } from '@/features/address/AddAddress';
import styles from './OfficeDataAddresses.module.scss';
import { useAuth } from '@/entities/Session';
import { User } from '@/entities/User';

interface OfficeDataAddressesProps {
  className?: string;
}

export const OfficeDataAddresses = memo(({ className }: OfficeDataAddressesProps) => {
  const { userData } = useAuth();
  const addresses = (userData as User)?.addresses || [];

  const { t } = useTranslation('office-page');

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.header}>
        <Flex justify="between" align="center" className={styles.header_inner}>
          <Typography variant="body-2" color="grey-dark-3" className={styles.title}>{t('myAddresses')}</Typography>
          <AddAddressButton className={styles.button} />
        </Flex>
      </div>
      <div className={styles.content}>
        {addresses.map((address) => (
          <EditableAddressItem
            key={address.id}
            address={address}
            actionsSlot={(addressId) => (
              <>
                <EditAddressButton address={address} />
                <DeleteAddressButton addressTitle={getFullAddress(address)} addressId={addressId} />
              </>
            )}
          />
        ))}
      </div>
    </div>
  );
});
