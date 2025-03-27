import { Story } from '@storybook/react';
import { StoreProvider } from '@/providers/StoreProvider/StoreProvider';
import { DeepPartial } from 'redux';
import { ReducersList, StoreSchema } from '@/shared/types/store';
import { editPersonalDataReducer } from '@/features/EditPersonalData';

const defaultAsyncReducers: ReducersList = {
  editPersonalData: editPersonalDataReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StoreSchema>,
  asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
