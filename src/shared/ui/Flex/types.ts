import { breakpoints } from '@/shared/config/breakpoints';
import {
  DetailedHTMLProps, ElementType, HTMLAttributes, ReactNode,
} from 'react';

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexDirection = 'row' | 'column' | 'column-reverse' | 'row-reverse';
export type FlexGap = '0' | '2' | '4' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '28' | '30' | '32' | '36' | '40' | '48';

export type FlexPropertyType = FlexJustify | FlexAlign | FlexDirection
export type FlexPropertyTypeName = 'justify' | 'align' | 'direction'

export type ResponsiveObject<T extends FlexPropertyType> = { [key in keyof typeof breakpoints]?: T }

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexOwnProps<E extends ElementType = ElementType> extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify | ResponsiveObject<FlexJustify>;
  align?: FlexAlign | ResponsiveObject<FlexAlign>;
  direction?: FlexDirection | ResponsiveObject<FlexDirection>;
  gap?: FlexGap;
  as?: E;
  fullWidth?: boolean;
}
