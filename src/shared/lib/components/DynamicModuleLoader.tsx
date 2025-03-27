import { FC, ReactNode, useEffect } from 'react';
import { ReduxStoreWithReducerManager, StoreSchemaKey } from '@/shared/types/store';
import { Reducer } from '@reduxjs/toolkit';
import { useStore } from 'react-redux';

export type ReducersList = {
  [name in StoreSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
  children: ReactNode;
  reducers: ReducersList;
  destroyOnUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({ destroyOnUnmount = true, reducers, children }) => {
  const store = useStore() as ReduxStoreWithReducerManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      if (!(name in store.reducerManager.getReducerMap())) {
        store.reducerManager.add(name as StoreSchemaKey, reducer);
        store.dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (destroyOnUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StoreSchemaKey);
          store.dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};
