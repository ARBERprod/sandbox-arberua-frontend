import { TableColumn } from '@/shared/ui/Table/types';

interface STD {
  date: string;
  name: string;
  amount: number;
}

export const separatedTableData:STD[] = [
  {
    date: '12.12.2022',
    amount: 300,
    name: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor',
  },
  {
    date: '11.12.2022',
    amount: 150,
    name: 'День Рождения',
  },
  {
    date: '11.12.2022',
    amount: 300,
    name: 'Бонус за отзыв',
  },
  {
    date: '12.12.2022',
    amount: 300,
    name: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor',
  },
];

export const separatedTableColumns: TableColumn<STD>[] = [
  {
    accessor: 'date',
    sortAccessor: 'date',
    header: 'Дата',
    data: {
      headAlign: 'left',
      cellAlign: 'left',
    },
  },
  {
    accessor: 'name',
    header: 'Наименование',
    data: {
      headAlign: 'left',
      cellAlign: 'left',
    },
  },
  {
    accessor: 'amount',
    header: 'Начислено',
    sortAccessor: 'amount',
    data: {
      headAlign: 'left',
      cellAlign: 'left',
    },
  },
];

export interface TD {
  size: string;
  waist: string;
  height: string;
}

export const tableData:TD[] = [
  {
    size: '30/32',
    waist: '80',
    height: '4(176)',
  },
  {
    size: '30/32',
    waist: '80',
    height: '4(176)',
  }, {
    size: '30/32',
    waist: '80',
    height: '4(176)',
  },
  {
    size: '30/32',
    waist: '80',
    height: '4(176)',
  },
];

export const columnsData:TableColumn<TD>[] = [
  {
    accessor: 'size',
    header: 'Размер',
  },
  {
    header: 'Обхват груди',
    accessor: 'waist',
  },
  {
    header: 'Рост',
    accessor: 'height',
  },
];
