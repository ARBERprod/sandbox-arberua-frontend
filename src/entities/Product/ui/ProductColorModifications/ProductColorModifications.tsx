import { memo } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
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
}: ProductColorModificationsProps) => (
  <Flex gap="8" align="center" className={cn(styles.root, className)}>
    {colors.map((color) => (
      <ColorOption
        key={color.url}
        color={color}
        onClick={() => onClick?.(color)}
        active={activeColor?.url === color.url}
      />
    ))}
  </Flex>
));
