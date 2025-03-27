import { memo } from 'react';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { OrdersList } from '../OrdersList';
import { OrdersTable } from '../OrdersTable';
import { officeOrdersReducer } from '../../model/slices/officeOrderSlice';
import { OrderDetailsModal } from '../OrderDetailsModal';
import styles from './OfficeOrdersView.module.scss';

export const OfficeOrdersView = memo(() => (
  <DynamicModuleLoader reducers={{ officeOrders: officeOrdersReducer }}>
    <div className={styles.root}>
      <OrdersTable className="hide-mobile-tablet" />
      <OrdersList className="hide-desktop" />
    </div>
    <OrderDetailsModal />
  </DynamicModuleLoader>
));
