import { ReactNode } from 'react';
import { DynamicModuleLoader } from '@/shared/lib/components/DynamicModuleLoader';
import { preorderProductReducer } from '../../model/preorderProductSlice';
import { PreorderProductModal } from '../PreorderProductModal';
import { PreorderProductSuccessModal } from '../PreorderProductSuccessModal';

interface PreorderProductProviderProps {
  children: ReactNode;
}

export const PreorderProductProvider = ({ children }:PreorderProductProviderProps) => (
  <DynamicModuleLoader reducers={{ preorderProduct: preorderProductReducer }}>
    {children}
    <PreorderProductModal />
    <PreorderProductSuccessModal />
  </DynamicModuleLoader>
);
