import { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

export type ButtonElements = 'button' | 'a';

type ButtonAdditionalProps<Type extends ButtonElements | ComponentType> =
  Type extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[Type]
    : Omit<ComponentPropsWithoutRef<Type>, 'as'>;

export type ButtonProps<Type extends ButtonElements | ComponentType> = {
  size?: 'small' | 'medium' | 'mediumlarge' | 'large' | 'xsmall' | 'largexxl';
  color?: 'dark' | 'light-primary' | 'light-secondary' | 'light-tertiary' | 'light-quaternary' | 'light-quinary' | 'transparent' | 'transparent-bg' | 'icon' | 'viber' | 'telegram';
  variant?: 'app' | 'app-small' | 'action' | 'rounded-label' | 'tab';
  active?: boolean;
  children: ReactNode | ReactNode[];
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  multiline?: boolean;
  disabled?: boolean;
  as?: Type;
} & ButtonAdditionalProps<Type>

export const Button = <
  Type extends ButtonElements | ComponentType<any> = 'button',
>({
    children,
    size = 'medium',
    color = 'dark',
    className,
    type = 'button',
    variant,
    startIcon,
    endIcon,
    fullWidth,
    active = false,
    multiline = false,
    as,
    ...rest
  }: ButtonProps<Type>) => {
  const Component = as || 'button';

  return (
    <Component
      type={type}
      className={cn(
        styles.button,
        styles[`button_size_${size}`],
        styles[`button_color_${color}`],
        styles[`button_${variant}`],
        {
          [styles.fullWidth]: fullWidth,
          [styles.active]: active,
          [styles.multiline]: multiline,
        },
        className,
      )}
      {...rest}
    >
      {startIcon}
      {children}
      {endIcon}
    </Component>
  );
};
