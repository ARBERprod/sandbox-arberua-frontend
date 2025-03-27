import { memo } from 'react';
import cn from 'classnames';
import styles from './Divider.module.scss';

interface DividerProps {
  className?: string;
}

export const Divider = memo(({ className }:DividerProps) => (
  <div className={cn(styles.root, className)} />
));
