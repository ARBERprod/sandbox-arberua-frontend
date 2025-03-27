import { ReactNode } from 'react';
import { DeepPartial } from 'redux';
import { StoreSchema } from '@/shared/types/store';
import { StoreProvider } from '@/providers/StoreProvider/StoreProvider';

export const getWrapper = (initialState?: DeepPartial<StoreSchema>) => ({ children }: { children?: ReactNode }) => (
  <StoreProvider initialState={initialState as StoreSchema}>
    {children}
  </StoreProvider>
);
