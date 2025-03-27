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
  title: string;
  url?: string;
  children: MenuLink[] | false;
  button?: CurrentMenuType | false;
  openNewPage?: boolean;
  color?: string;
  slug?: string;
  bold?: boolean;
}
