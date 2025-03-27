import { memo } from 'react';
import cn from 'classnames';
import { SortOrder } from '@/shared/ui/Table/types';
import { Svg } from '@/shared/ui/Svg';
import ChevronUpIcon from '@/shared/assets/icons/filled-chevron-u.svg';
import ChevronDownIcon from '@/shared/assets/icons/filled-chevron-d.svg';

import styles from './SortButton.module.scss';

interface SortButtonProps {
  className?: string;
  order: SortOrder | false;
  onClick: () => void;
}

export const SortButton = memo(({ className, onClick, order }:SortButtonProps) => (
  <button className={cn(styles.root, className)} onClick={onClick}>
    <Svg Icon={ChevronUpIcon} width={10} height={5} fill={order === 'asc' ? 'grey' : '#c2c2c2'} />
    <Svg Icon={ChevronDownIcon} width={10} height={5} fill={order === 'desc' ? 'grey' : '#c2c2c2'} />
  </button>
));
