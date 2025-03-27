import { CSSProperties, SVGProps } from 'react';
import cn from 'classnames';
import { COLORS } from '@/shared/config/colors';
import { SvgType } from '@/shared/types/common';
import { ANY_COLOR_REGEX } from '@/shared/constants/regexp';
import styles from './Svg.module.scss';

type SvgOwnProps = SVGProps<SVGSVGElement>

type SvgStyles = CSSProperties & {
  '--stroke'?: string,
  '--fill'?: string,
  '--width'?: string,
  '--height'?: string,
}

interface SvgProps extends Omit<SvgOwnProps, 'stroke' | 'fill' | 'className' | 'width' | 'height'> {
  Icon: SvgType;
  className?: string;
  stroke?: keyof typeof COLORS | 'none' | string;
  fill?: keyof typeof COLORS | 'none' | string;
  width?: number | string | 'auto';
  height?: number | string | 'auto';
}

export const Svg = ({
  className,
  stroke,
  Icon,
  fill,
  width = 24,
  height = 24,
  style,
  ...rest
}: SvgProps) => {
  const getStrokeColor = () => {
    if (!stroke) return null;
    if (stroke === 'none') return 'none';
    if (ANY_COLOR_REGEX.test(stroke)) return stroke;
    return COLORS[stroke as keyof typeof COLORS];
  };

  const getFillColor = () => {
    if (!fill) return null;
    if (fill === 'none') return 'none';
    if (ANY_COLOR_REGEX.test(fill)) return fill;
    return COLORS[fill as keyof typeof COLORS];
  };

  const getSize = (sizeValue: SvgProps['height'] | SvgProps['width']) => {
    if (sizeValue === 'auto') return sizeValue;
    if (typeof sizeValue === 'number') return `${sizeValue}px`;
    if (Number.isNaN(Number(sizeValue))) return sizeValue;
    return `${sizeValue}px`;
  };
  const getStyles = () => {
    const strokeColor = getStrokeColor();
    const fillColor = getFillColor();
    const iconWidth = getSize(width);
    const iconHeight = getSize(height);
    const styles: SvgStyles = {
      ...style,
    };
    styles['--width'] = iconWidth;
    styles['--height'] = iconHeight;

    if (strokeColor) {
      styles['--stroke'] = strokeColor;
    }
    if (fillColor) {
      styles['--fill'] = fillColor;
    }
    return styles;
  };
  const iconStyles = getStyles();
  return (
    <Icon
      style={iconStyles as CSSProperties}
      className={cn(styles.root, {
        [styles.stroke]: stroke !== undefined,
        [styles.fill]: fill !== undefined,
      }, className)}
      {...rest}
    />
  );
};
