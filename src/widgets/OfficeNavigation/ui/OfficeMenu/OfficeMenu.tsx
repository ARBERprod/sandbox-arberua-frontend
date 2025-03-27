import { memo } from 'react';
import cn from 'classnames';
import { officeMenu } from '@/widgets/OfficeNavigation';
import { Typography } from '@/shared/ui/Typography';
import { useRouter } from 'next/router';
import { Svg } from '@/shared/ui/Svg';
import ChevronRightIcon from '@/shared/assets/icons/chevron-r.svg';
import { FlexCol } from '@/shared/ui/Flex';
import { useTranslation } from 'next-i18next';
import styles from './OfficeMenu.module.scss';

interface OfficeMenuProps {
  className?: string;
}

export const OfficeMenu = memo(({ className }: OfficeMenuProps) => {
  const { push } = useRouter();
  const { t } = useTranslation('office-page');
  return (
    <nav className={cn(styles.root, className)}>
      <FlexCol as="ul" gap="12" className={styles.list}>
        {officeMenu(t).map((item) => (
          <li className="w-full" key={item.label}>
            <button onClick={() => push(item.href)} className={styles.button}>
              <Typography variant="body-1">
                {item.label}
              </Typography>
              {item.Icon
                ? <Svg width={24} height="auto" stroke="grey-dark" Icon={item.Icon} />
                : <Svg width={16} height={7} stroke="grey-dark" fill="grey-dark" Icon={ChevronRightIcon} />}
            </button>
          </li>
        ))}
      </FlexCol>
    </nav>
  );
});
