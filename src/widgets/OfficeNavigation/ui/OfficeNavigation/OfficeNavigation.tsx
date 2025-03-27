import { memo } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { Svg } from '@/shared/ui/Svg';
import { useTranslation } from 'next-i18next';
import { getButtonColor } from '../../lib/getButtonColor';
import { officeMenu } from '../../constants/officeMenu';
import styles from './OfficeNavigation.module.scss';

interface OfficeNavigationProps {
  className?: string;
}

export const OfficeNavigation = memo(({ className }:OfficeNavigationProps) => {
  const { push, asPath } = useRouter();
  const { t } = useTranslation('office-page');

  return (
    <nav className={cn(styles.root, className)}>
      <Container className={styles.container}>
        <ul className={styles.list}>
          {officeMenu(t).map((item) => {
            const isActive = asPath === item.href;

            return (
              <li key={item.label}>
                <Button
                  size="xsmall"
                  color={getButtonColor(item, asPath)}
                  className={cn(styles.button, {
                    [styles.current]: isActive,
                  })}
                  onClick={() => push(item.href)}
                >
                  {item.Icon ? <Svg Icon={item.Icon} /> : item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
});
