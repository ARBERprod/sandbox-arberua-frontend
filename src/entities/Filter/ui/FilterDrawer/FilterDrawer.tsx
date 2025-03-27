import { ReactNode } from 'react';
import { Button } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Typography } from '@/shared/ui/Typography';
import { Divider } from '@/shared/ui/Divider';
import { Flex } from '@/shared/ui/Flex';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import styles from './FilterDrawer.module.scss';

interface FilterDrawerProps {
  isOpen: boolean;
  onCancel: () => void;
  onClose: () => void;
  onAccept: () => void;
  className?: string;
  filtersSlot: ReactNode;
}

export const FilterDrawer = ({
  className, onAccept, onCancel, isOpen, onClose, filtersSlot,
}: FilterDrawerProps) => {
  const { t } = useTranslation();
  return (
    <Drawer className={cn(styles.root, className)} isOpen={isOpen} onClose={onClose} anchor="left" withCloseButton>
      <Typography variant="body-1" centered>{t('filter')}</Typography>
      <div className={styles.filters}>
        {filtersSlot}
      </div>
      <Flex className="mt-16" gap="12">
        <Button onClick={onCancel} fullWidth size="large" color="light-secondary">{t('reset')}</Button>
        <Button onClick={onAccept} fullWidth size="large">{t('show')}</Button>
      </Flex>
    </Drawer>
  );
};
