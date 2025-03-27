import Link from 'next/link';
import { Typography } from '@/shared/ui/Typography';
import { lastElement } from '@/shared/lib/utils/array';
import { Breadcrumb } from '../types';
import { Breadcrumps } from '../Breadcrumps';

interface PageBreadcrumbsProps {
  className?: string;
  breadcrumbs: Breadcrumb[];
}

export const PageBreadcrumbs = ({ className, breadcrumbs }:PageBreadcrumbsProps) => (
  <Breadcrumps className={className}>
    {breadcrumbs.slice(0, -1).map((breadcrumb) => (
      <Link href={breadcrumb.url} key={breadcrumb.url}>
        <Typography as="span" variant="body-2">{breadcrumb.title}</Typography>
      </Link>
    ))}
    <Typography variant="body-2" color="black">{lastElement(breadcrumbs)?.title}</Typography>
  </Breadcrumps>
);
