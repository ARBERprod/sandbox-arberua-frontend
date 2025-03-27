import cn from 'classnames';
import { SearchButton, useSearchModel, SearchField } from '@/features/Search';
import { Language } from '@/shared/ui/Language';
import { Logo } from '@/shared/ui/Logo';
import { Container } from '@/shared/ui/Container';
import { useFixedHeader } from '@/shared/lib/hooks/useFixedHeader';
import { HEADER_ELEMENT_ID } from '@/shared/constants/common';

import { useTranslation } from 'next-i18next';
import { HeaderAuthActions } from '../HeaderAuthActions';
import { HeaderMenuContainer } from '../menu/HeaderMenuContainer';
import styles from './Header.module.scss';

interface HeaderProps {
    className?: string;
    headerVariant?: 'transparent' | 'grey';
}

export const Header = ({
  className,
  headerVariant = 'transparent',
}: HeaderProps) => {
  const isFixed = useFixedHeader();

  const { isSearchOpen } = useSearchModel();

  const getSearchActiveClassName = () => {
    if (!isSearchOpen) return '';
    if (headerVariant === 'grey') return 'gray-active';
    return 'active';
  };

  const activeClassName = isSearchOpen ? 'active' : '';
  const notShowClassName = isSearchOpen ? 'visible' : 'hidden';
  const showClassName = isSearchOpen ? 'hidden' : 'visible';

  const { t } = useTranslation();

  return (
    <header
      id={HEADER_ELEMENT_ID}
      className={cn(
        styles.header,
        styles[activeClassName],
        styles[headerVariant],
        {
          [styles.fixed]: isFixed,
        },
        className,
      )}
    >
      <Container className={styles.container}>
        <div className={styles.layout}>
          <HeaderMenuContainer className={styles.menu_toggle} />

          <Logo className={cn(styles.logo, { [styles.hidden]: isSearchOpen })} />

          <SearchField
            className={cn(styles.search, styles[notShowClassName], getSearchActiveClassName())}
            name="search"
            placeholder={t('header.search.placeholder')}
          />

          <SearchButton
            className={cn(styles.search_btn, styles['m-secondary'], styles.item, styles[showClassName])}
          />

          <Language className={cn(styles.language, styles.item)} />

          <HeaderAuthActions className={cn(styles.actions, styles.item)} />
        </div>
      </Container>
    </header>
  );
};
