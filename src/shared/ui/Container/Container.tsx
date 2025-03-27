import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Container.module.scss';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ className, children }) => (
  <div className={cn(styles.root, className)}>
    {children}
  </div>
);
