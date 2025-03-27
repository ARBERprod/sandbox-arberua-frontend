import { ButtonProps } from '@/shared/ui/Button';
import { OfficeMenuItem } from '../constants/officeMenu';

export const getButtonColor = (item: OfficeMenuItem, asPath: string): ButtonProps<'button'>['color'] => {
  if (item.Icon) return 'icon';
  return asPath === item.href ? 'dark' : 'transparent';
};
