import { ComponentProps, ElementType } from 'react';
import cn from 'classnames';
import styles from './Flex.module.scss';
import {
  FlexOwnProps, FlexPropertyType, FlexPropertyTypeName, ResponsiveObject,
} from './types';

const defaults: Record<FlexPropertyTypeName, FlexPropertyType> = {
  justify: 'start',
  direction: 'row',
  align: 'stretch',
};

const getClasses = <T extends FlexPropertyType>(
  type: FlexPropertyTypeName,
  value?: T | ResponsiveObject<T>,
): string[] => {
  if (!value) return [defaults[type]];
  if (typeof value === 'string') {
    return [styles[`${type}-${value}`]];
  }

  const responsiveClasses = Object.entries(value)
    .map(([breakpoint, value]) => styles[`${breakpoint}-${type}-${value}`]);

  return responsiveClasses.concat([styles[`${type}-${defaults[type]}`]]);
};

const defaultElement = 'div';

export type FlexProps<E extends ElementType = typeof defaultElement> =
  FlexOwnProps<E>
  & Omit<ComponentProps<E>, keyof FlexOwnProps>

export const Flex = <E extends ElementType = typeof defaultElement>({
  children,
  gap = '0',
  align = 'stretch',
  fullWidth,
  justify = 'start',
  direction = 'row',
  as,
  className,
  ...rest
}: FlexProps<E>) => {
  const Element = as || 'div';
  const classes = [
    className,
    getClasses('justify', justify),
    getClasses('align', align),
    getClasses('direction', direction),
    styles[`gap${gap}`],
  ];
  return (
    <Element className={cn(styles.root, classes, { [styles.fullWidth]: fullWidth }, className)} {...rest}>
      {children}
    </Element>
  );
};
