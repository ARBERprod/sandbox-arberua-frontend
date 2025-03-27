import { CSSProperties, memo } from 'react';
import cn from 'classnames';
import { SvgType } from '@/shared/types/common';
import DoneIcon from '@/shared/assets/icons/check-secondary.svg';
import WarningIcon from '@/shared/assets/icons/info.svg';
import ErrorIcon from '@/shared/assets/icons/close.svg';
import { COLORS } from '@/shared/config/colors';
import { NotificationType } from '../types';
import { Svg } from '@/shared/ui/Svg';

import styles from './NotificationIcon.module.scss';

const typeIconMap:Record<NotificationType, SvgType> = {
  success: DoneIcon,
  error: ErrorIcon,
  info: WarningIcon,
};

interface NotificationIconProps {
  className?: string;
  icon?: SvgType;
  type?: NotificationType;
  style?: CSSProperties;
  color?: keyof typeof COLORS;
}

export const NotificationIcon = memo(({
  className, style, icon, type = 'success', color,
}:NotificationIconProps) => {
  const Icon = icon || typeIconMap[type];
  return (
    <div style={{ ...style }} className={cn(styles.root, className)}>
      <Svg Icon={Icon} width={18} stroke={color || 'black'} />
    </div>
  );
});
