import {
  AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReducerManager, StoreSchema, StoreSchemaKey } from '@/shared/types/store';

export const createReducerManager = (initialReducers:ReducersMapObject<StoreSchema>):ReducerManager => {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove:StoreSchemaKey[] = [];

  return {
    getReducerMap: () => reducers,

    reduce: (state:Partial<StoreSchema>, action:AnyAction) => {
      if (keysToRemove.length > 0) {
        // eslint-disable-next-line no-param-reassign
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }

      return combinedReducer(state as StoreSchema, action);
    },

    add: (key:StoreSchemaKey, reducer:Reducer) => {
      if (!key || reducers[key]) {
        return;
      }

      // @ts-ignore
      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },

    remove: (key:StoreSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete (reducers as Partial<typeof reducers>)[key];

      keysToRemove.push(key);

      combinedReducer = combineReducers(reducers);
    },
  };
};
