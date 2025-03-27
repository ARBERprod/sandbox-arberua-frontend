import {
  ComponentProps, CSSProperties, ElementType, ReactNode, useMemo,
} from 'react';
import cn from 'classnames';
import { COLORS } from '@/shared/config/colors';
import { ANY_COLOR_REGEX } from '@/shared/constants/regexp';
import styles from './Typography.module.scss';

export type TypographyVariants =
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'title-4'
  | 'title-5'
  | 'title-6'
  | 'body-1'
  | 'body-2'
  | 'body-3'
  | 'label';

interface TypographyOwnProps<E extends ElementType = ElementType> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  variant?: TypographyVariants;
  underlined?: boolean;
  centered?: boolean;
  weight?: 300 | 400 | 500 | 600;
  as?: E;
  color?: keyof typeof COLORS | string;
}

type TypographyProps<E extends ElementType> = TypographyOwnProps<E> &
  Omit<ComponentProps<E>, keyof TypographyOwnProps>;

export const Typography = <E extends ElementType = ElementType>(props: TypographyProps<E>) => {
  const {
    as,
    children,
    variant = 'body-1',
    className,
    style,
    color,
    underlined,
    centered,
    weight,
    ...rest
  } = props;

  const Component = useMemo(() => {
    if (as) return as;
    switch (variant) {
    case 'title-1':
      return 'h1';
    case 'title-2':
      return 'h2';
    case 'title-3':
      return 'h3';
    case 'title-4':
      return 'h4';
    case 'title-5':
      return 'h5';
    case 'title-6':
      return 'h6';
    case 'label':
      return 'label';
    default:
      return 'p';
    }
  }, [variant, as]);

  const getColor = () => {
    if (!color) return null;
    if (ANY_COLOR_REGEX.test(color)) return color;
    return COLORS[color as keyof typeof COLORS];
  };

  const getStyle = () => {
    const result: CSSProperties & { '--color'?: string } = {
      ...style,
    };
    const color = getColor();
    if (color) {
      result.color = color;
    }
    if (underlined) {
      result.textDecoration = 'underline';
    }
    if (centered) {
      result.textAlign = 'center';
    }
    if (weight) {
      result.fontWeight = weight;
    }
    return result;
  };
  const typographyStyles = getStyle();
  return (
    <Component
      style={typographyStyles as CSSProperties}
      className={cn(styles.root, styles[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
};
