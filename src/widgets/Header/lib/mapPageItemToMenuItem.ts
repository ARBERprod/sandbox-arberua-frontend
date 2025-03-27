import { PageItem } from '@/entities/Menu/api/types';
import { MenuLink } from '@/widgets/Header/model/types';

export const mapPageItemToMenuItem = (item: PageItem): MenuLink => {
  const { url, title } = item;
  return {
    url,
    title,
    children: false,
    button: false,
  };
};
