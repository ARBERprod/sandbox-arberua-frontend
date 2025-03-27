import { FC, memo } from 'react';
import { ManTables } from '../ManTables';
import { WomanTables } from '../WomanTables';
import { ShoesTables } from '../ShoesTables';

const tablesMap:Record<'man' | 'woman' | 'shoes', FC<{className?: string}>> = {
  man: ManTables,
  woman: WomanTables,
  shoes: ShoesTables,
};

interface SizesTableProxyProps {
  className?: string;
  variant: 'man' | 'woman' | 'shoes';
}

export const SizesTableProxy = memo(({ className, variant }:SizesTableProxyProps) => {
  const Component = tablesMap[variant];
  return <Component className={className} />;
});
