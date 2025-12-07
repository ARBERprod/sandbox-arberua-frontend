import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { tokenService } from '@/shared/lib/services/token.service';
import { SessionSchema } from '../types/SessionSchema';
import { sessionApi } from '../../api/sessionApi';
import { refetchSession } from '../../lib/refetchSession';

const initialState: SessionSchema = {
  userData: null,
  city: null,
  isLoaded: false,
  isFetching: false,
  isPopupShowed: 'notShouldBe',
};

const sessionSlice = buildSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.isPopupShowed = 'notShouldBe';
      tokenService.removeToken();
    },
    hidePopap: (state) => {
      state.isPopupShowed = 'showed';
    },
  },
  extraReducers: (builder) => {
    // addCase must come before addMatcher
    builder.addCase(refetchSession.fulfilled, (state, action) => {
      state.userData = action.payload.data.user || null;
      state.city = action.payload.data.city || null;
      state.isLoaded = true;
      state.isFetching = false;
      const isPopupShowed = state.isPopupShowed === 'showed' || action.payload.data.isPopupShowed === 'showed';
      if (isPopupShowed) {
        state.isPopupShowed = 'showed';
      } else {
        state.isPopupShowed = (state.userData || action.payload.data.user) ? 'shouldBe' : 'notShouldBe';
      }
    });
    builder.addCase(refetchSession.pending, (state) => {
      state.isFetching = true;
    });

    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchFulfilled, (state, action) => {
      state.userData = action.payload.data.user || null;
      state.city = action.payload.data.city || null;
      state.isLoaded = true;
      state.isFetching = false;
      const isPopupShowed = state.isPopupShowed === 'showed' || action.payload.data.isPopupShowed === 'showed';
      if (isPopupShowed) {
        state.isPopupShowed = 'showed';
      } else {
        state.isPopupShowed = (state.userData || action.payload.data.user) ? 'shouldBe' : 'notShouldBe';
      }
    });
    builder.addMatcher(sessionApi.endpoints.sessionFetch.matchPending, (state) => {
      state.isFetching = true;
    });
  },
});

export const { reducer: sessionReducer, useActions: useSessionActions } = sessionSlice;
export const { hidePopap } = sessionSlice.actions;
