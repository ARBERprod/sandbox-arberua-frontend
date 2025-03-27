import { ReactNode } from 'react';
import cn from 'classnames';
import { Flex } from '@/shared/ui/Flex';
import { StripedTable } from '@/shared/ui/Table';
import { TableProps } from '@/shared/ui/Table/types';
import { Typography } from '@/shared/ui/Typography';
import { typedMemo } from '@/shared/lib/utils/typedMemo';
import styles from './SizeTable.module.scss';

interface SizeTableProps<T extends object> extends TableProps<T> {
  className?: string;
  title?: string;
  action?: ReactNode;
}

export const SizeTable = typedMemo(
  <T extends object>({
    className, action, title, data, columns,
  }:SizeTableProps<T>) => (
    <div className={cn(styles.root, className)}>
      <Flex
        gap="16"
        justify={{
          'mobile-tablet': action ? 'between' : 'center',
          desktop: action ? 'between' : 'center',
        }}
        align={{
          'mobile-tablet': action ? 'center' : 'start',
          desktop: 'center',
        }}
        direction={{
          'mobile-tablet': 'column',
          desktop: 'row',
        }}
        className={action ? 'mb-5' : 'mb-4'}
      >
        {title && <Typography variant="title-6">{title}</Typography>}
        {action
        && (
          <div className={styles.action}>
            {action}
          </div>
        )}
      </Flex>
      <StripedTable
        data={data}
        columns={columns}
        className={styles.table}
      />
    </div>
  ),
);
