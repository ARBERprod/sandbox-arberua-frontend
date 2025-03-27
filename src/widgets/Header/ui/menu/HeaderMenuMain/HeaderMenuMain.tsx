import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { CurrentMenuType } from '../../../model/types';
import { headerMenuMainMocked } from '../../../constants/headerMenu';
import { HeaderMenuListItems } from '../HeaderMenuListItems';
import styles from './HeaderMenuMain.module.scss';

interface HeaderMenuMainProps {
  className?: string;
  onClick?: (type: CurrentMenuType) => void;
}

export const HeaderMenuMain = ({ className, onClick }:HeaderMenuMainProps) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.root, className)}>
      <HeaderMenuListItems items={headerMenuMainMocked(t)} onClick={onClick} />
    </div>
  );
};
