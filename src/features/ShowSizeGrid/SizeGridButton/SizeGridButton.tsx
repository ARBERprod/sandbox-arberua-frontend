import { memo, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/shared/ui/Typography';
import { Svg } from '@/shared/ui/Svg';
import SizeGridIcon from '@/shared/assets/icons/size-icon.svg';
import { SizeGridModal } from '@/features/ShowSizeGrid/SizeGridModal';
import styles from './SizeGridButton.module.scss';

interface SizeGridButtonProps {
  className?: string;
  variant: 'default' | 'icon';
}

export const SizeGridButton = memo(({
  className,
  variant = 'icon',
}: SizeGridButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(styles.root, styles[variant], className)}
        type="button"
      >
        <Svg width={16} height={16} Icon={SizeGridIcon} />
        {variant === 'icon'
          && <Typography variant="body-2" as="span">{t('size_grid')}</Typography>}
      </button>
      <SizeGridModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
});
