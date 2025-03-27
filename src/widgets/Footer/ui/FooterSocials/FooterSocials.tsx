import cn from 'classnames';
import { SocialsMenu } from '@/shared/ui/SocialsMenu';
import { FOOTER_SOCIALS } from '@/shared/constants/socials';

interface FooterSocialsProps {
  className?: string;
}

export const FooterSocials = ({ className }: FooterSocialsProps) => (
  <SocialsMenu className={cn(className)} socials={FOOTER_SOCIALS} />
);
