import { CSSProperties } from 'react';
import cn from 'classnames';
import styles from './ProductColorModifications.module.scss';
import { ProductPickerColor } from '@/entities/Product/model/types';
import Link from 'next/link';

interface ColorOptionProps {
  color: ProductPickerColor;
  onClick?: () => void;
  className?: string;
  active: boolean;
}

export const ColorOption = ({
  className, color, active, onClick,
}: ColorOptionProps) => (
  <Link
    href={color.url}
    onClick={onClick}
    aria-label={color.title ?? color.value}
    title={color.title}
    style={{ '--color': color.value } as CSSProperties}
    className={cn(styles.color, {
      [styles.active]: active,
      [styles.unavailable]: color.isAvailable === false,
    }, className)}
  />
);
