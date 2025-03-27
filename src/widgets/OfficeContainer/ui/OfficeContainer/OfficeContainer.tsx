import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './OfficeContainer.module.scss';

interface OfficeContainerProps {
  className?: string;
  children: ReactNode;
}

export const OfficeContainer = ({ className, children }:OfficeContainerProps) => (
  <div className={cn(styles.root, className)}>
    {children}
  </div>
);
