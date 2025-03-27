import { memo, ReactElement } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import { Address } from '../../model/types';
import styles from './EditableAddressItem.module.scss';
import { getFullAddress } from '@/entities/Address/lib/getFullAddress';

interface EditableAddressItemProps {
  className?: string;
  address: Address;
  actionsSlot?: (addressId: string) => ReactElement;
}

export const EditableAddressItem = memo(({ className, address, actionsSlot }:EditableAddressItemProps) => (
  <div className={cn(styles.root, className)}>
    <Flex align="center" justify="between">
      <Typography variant="body-2" className={styles.title}>{getFullAddress(address)}</Typography>
      <div className={styles.buttons}>
        <Flex align="center" gap="12">
          {actionsSlot && actionsSlot(address.id)}
        </Flex>
      </div>
    </Flex>
  </div>
));
