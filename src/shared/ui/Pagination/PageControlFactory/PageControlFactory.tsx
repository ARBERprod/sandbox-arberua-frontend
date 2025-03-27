import { PageControl } from '@/shared/ui/Pagination/PageControl';
import { Svg } from '@/shared/ui/Svg';
import ChevronLeftIcon from '@/shared/assets/icons/arrow-left.svg';
import ChevronRightIcon from '@/shared/assets/icons/arrow-right.svg';

export interface PageControlFactoryProps {
  type: 'page' | 'prev' | 'next' | 'jump-next' | 'jump-prev';
  page: number;
  onPageChange?: (page: number) => void;
  href: string;
  activePage: number;
  pageCount: number;
}

export const PageControlFactory = ({
  activePage, onPageChange, pageCount, page, href, type,
}: PageControlFactoryProps) => {
  if (type === 'jump-next' || type === 'jump-prev') {
    return (
      <PageControl href={href}>
        ...
      </PageControl>
    );
  }
  if (type === 'prev') {
    const disabled = activePage === 1;
    return (
      <PageControl href={href} className="mr-15" disabled={disabled}>
        <Svg Icon={ChevronLeftIcon} width={6} height={12} stroke={disabled ? 'grey' : 'black'} />
      </PageControl>
    );
  }
  if (type === 'next') {
    const disabled = activePage === pageCount;
    return (
      <PageControl href={href} className="ml-15" disabled={disabled}>
        <Svg Icon={ChevronRightIcon} width={6} height={12} stroke={disabled ? 'grey' : 'black'} />
      </PageControl>
    );
  }
  if (type === 'page') {
    return (
      <PageControl
        href={href}
        isActive={activePage === page}
        key={page}
        onClick={() => onPageChange?.(page)}
      >
        {page}
      </PageControl>
    );
  }
  return null;
};
