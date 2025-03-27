import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './LookBuilderSidebar.module.scss';

interface LookBuilderSidebarProps {
  className?: string;
  children?: ReactNode;
}

export const LookBuilderSidebar = ({ className, children }:LookBuilderSidebarProps) => (
  <div className={cn(styles.root, className)}>
    {children}
  </div>
);
