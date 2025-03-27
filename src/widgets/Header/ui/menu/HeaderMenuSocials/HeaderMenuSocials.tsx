import cn from 'classnames';
import { SocialsMenu } from '@/shared/ui/SocialsMenu';
import styles from './HeaderMenuSocials.module.scss';
import { HEADER_SOCIALS } from '@/shared/constants/socials';

interface HeaderMenuSocialsProps {
  className?: string;
}

export const HeaderMenuSocials = ({ className }:HeaderMenuSocialsProps) => (
  <div className={cn(styles.root, className)}>
    <SocialsMenu socials={HEADER_SOCIALS} />
  </div>
);
