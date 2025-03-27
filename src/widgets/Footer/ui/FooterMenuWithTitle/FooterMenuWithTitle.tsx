import cn from 'classnames';
import { useAccordion } from '@/shared/lib/hooks/useAccordion';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { breakpoints } from '@/shared/config/breakpoints';
import ArrowUpIcon from '@/shared/assets/icons/arrow-up.svg';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down.svg';
import { Svg } from '@/shared/ui/Svg';
import { NoSSR } from '@/shared/lib/components/NoSSR';
import styles from './FooterMenuWithTitle.module.scss';
import { FooterMenu, FooterMenuProps } from '../FooterMenu/FooterMenu';
import { Typography } from '@/shared/ui/Typography';

interface FooterMenuWithTitleProps extends FooterMenuProps {
  title?: string;
}

export const FooterMenuWithTitle = ({ className, items, title }:FooterMenuWithTitleProps) => {
  const isDesktop = useMediaQuery(breakpoints.desktop);
  const { ref, toggle, isVisible } = useAccordion<HTMLDivElement>(isDesktop);

  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(styles.header)} onClick={isDesktop ? undefined : toggle} role="presentation">
        <Typography variant="body-2" weight={500} as="h5">
          {title}
        </Typography>
        <NoSSR>
          {isVisible
            ? <Svg className={cn(styles.icon)} Icon={ArrowUpIcon} width="7" height="3" />
            : <Svg className={cn(styles.icon)} Icon={ArrowDownIcon} width="7" height="3" />}
        </NoSSR>
      </div>
      {items && <div ref={ref}><FooterMenu items={items} /></div>}
    </div>
  );
};
