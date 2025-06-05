import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types';

const initialState: UserSchema = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
