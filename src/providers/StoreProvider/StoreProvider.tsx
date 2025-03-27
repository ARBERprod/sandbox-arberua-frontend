import { ReactNode } from 'react';
import { DeepPartial } from 'redux';
import { Provider } from 'react-redux';
import { ReducersList, StoreSchema } from '@/shared/types/store';
import { makeStore } from '@/shared/config/store/makeStore';
import { ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StoreSchema>;
  asyncReducers?: ReducersList;
}

export const StoreProvider = ({
  initialState,
  children,
  asyncReducers,
}: StoreProviderProps) => {
  const store = makeStore(
    initialState as StoreSchema,
    undefined,
    asyncReducers as ReducersMapObject<StoreSchema>,
  );
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
