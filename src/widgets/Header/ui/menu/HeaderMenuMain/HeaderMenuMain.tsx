import { useMemo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { routerPaths } from '@/shared/config/router';
import { useGetCollaborationsQuery } from '@/entities/Collaboration';
import { CurrentMenuType, MenuLink } from '../../../model/types';
import { headerMenuMainMocked } from '../../../constants/headerMenu';
import { insertAfterUrl } from '../../../lib/insertAfterUrl';
import { HeaderMenuListItems } from '../HeaderMenuListItems';
import styles from './HeaderMenuMain.module.scss';

interface HeaderMenuMainProps {
  className?: string;
  onClick?: (type: CurrentMenuType) => void;
}

export const HeaderMenuMain = ({ className, onClick }:HeaderMenuMainProps) => {
  const { t } = useTranslation();
  // The list is prefetched in App.getInitialProps, so on SSR the hook reads a ready cache entry
  // and the links are in the HTML before hydration.
  const { data } = useGetCollaborationsQuery();

  const items = useMemo(() => {
    const collaborationItems: MenuLink[] = (data?.collaborations ?? []).map((collaboration) => ({
      id: collaboration.id,
      title: collaboration.label,
      // Straight from the API, locale prefix included: next/link does not add a second one, and a
      // change of the URL scheme must stay a backend-only edit.
      url: collaboration.url,
      children: false,
      button: false,
    }));

    return insertAfterUrl(headerMenuMainMocked(t), routerPaths.collections(), collaborationItems);
  }, [t, data]);

  return (
    <div className={cn(styles.root, className)}>
      <HeaderMenuListItems items={items} onClick={onClick} />
    </div>
  );
};
