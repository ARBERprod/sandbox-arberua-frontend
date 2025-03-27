import { ReactNode } from 'react';
import cn from 'classnames';
import { Container } from '@/shared/ui/Container';
import styles from './SizesViewContainer.module.scss';

interface SizesViewContainerProps {
  className?: string;
  children: ReactNode;
}

export const SizesViewContainer = ({ className, children }:SizesViewContainerProps) => (
  <Container className={cn(styles.root, className)}>
    {children}
  </Container>
);
