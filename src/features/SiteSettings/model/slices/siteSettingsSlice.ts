import { buildSlice } from '@/shared/lib/utils/buildSlice';
import { SiteSettingsSchema } from '../types/siteSettingsSchema';

const initialState: SiteSettingsSchema = {
  isSettingsModalOpen: false,
};

export const siteSettingsSlice = buildSlice({
  name: 'siteSettings',
  initialState,
  reducers: {
    closeSettingsModal: (state) => {
      state.isSettingsModalOpen = false;
    },
    openSettingsModal: (state) => {
      state.isSettingsModalOpen = true;
    },
  },
});

export const {
  reducer: siteSettingsReducer,
  useActions: useSiteSettingsActions,
} = siteSettingsSlice;
