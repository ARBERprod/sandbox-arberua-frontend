import { memo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { Flex } from '@/shared/ui/Flex';
import { Typography } from '@/shared/ui/Typography';
import styles from './ProductColorModifications.module.scss';
import { ProductPickerColor } from '../../model/types';
import { ColorOption } from './ColorOption';

interface ProductColorModificationsProps {
  className?: string;
  activeColor?: ProductPickerColor;
  colors: ProductPickerColor[];
  onClick?: (color: ProductPickerColor) => void;
}

export const ProductColorModifications = memo(({
  className, colors = [], activeColor, onClick,
}: ProductColorModificationsProps) => {
  const { t } = useTranslation('product-card');

  if (colors.length === 0) {
    return null;
  }

  return (
    <>
      <Typography variant="body-2" className="mb-3">
        {t('more_colors')}
      </Typography>
      <Flex gap="12" align="center" className={cn(styles.root, className)}>
        {colors.map((color) => (
          <ColorOption
            key={color.url}
            color={color}
            onClick={() => onClick?.(color)}
            active={activeColor?.url === color.url}
          />
        ))}
      </Flex>
    </>
  );
});
