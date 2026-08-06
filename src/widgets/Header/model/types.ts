export enum MenuView {
  MAIN = 'main',
  CATALOG = 'catalog',
  INFO = 'info',
}

export type CurrentMenuType =
  | MenuView.MAIN
  | MenuView.CATALOG
  | MenuView.INFO;

export type MenuLinkView =
  | 'link'
  | 'accordion'
  | 'button';

export interface MenuLink {
  // Collaboration items share the title of their section, so the list key cannot be the title.
  id?: string;
  title: string;
  url?: string;
  href?: string;
  children: MenuLink[] | false;
  button?: CurrentMenuType | false;
  openNewPage?: boolean;
  color?: string;
  slug?: string;
  bold?: boolean;
}
