import { Children, cloneElement, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/Typography';
import { isReactFragment } from '@/shared/types/type-guards';
import styles from './Breadcrumps.module.scss';

interface BreadcrumpsProps {
  className?: string;
  children: ReactNode;
}

export const Breadcrumps = ({
  className,
  children,
}: BreadcrumpsProps) => {
  const getChildren = (children: ReactNode[]) => Children.map(children, (child, index) => {
    if (!child || typeof child === 'number' || typeof child === 'string' || typeof child === 'boolean'
      || isReactFragment(child)) {
      return null;
    }
    return (
      <>
        {index !== 0 && <Typography variant="body-2" color="grey-dark-6">/</Typography>}
        {cloneElement(child, {
          ...child.props,
          className: cn(child.props.className, styles.color),
        }, child.props.children)}
      </>
    );
  });
  const renderContent = () => {
    if (!Array.isArray(children)) return children;
    return getChildren(children);
  };

  return (
    <div className={cn(styles.root, className)}>
      {renderContent()}
    </div>
  );
};
