import { ComponentPropsWithoutRef, FC, memo } from 'react';

export const typedMemo: <Component extends FC<any>>(
  component: Component,
  compare?: (
    prevProps: ComponentPropsWithoutRef<Component>,
    newProps: ComponentPropsWithoutRef<Component>
  ) => boolean
) => Component = memo;
