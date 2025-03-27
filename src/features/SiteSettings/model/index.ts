import { useSiteSettingsActions } from './slices/siteSettingsSlice';

export const useSiteSettingsModel = () => {
  const { openSettingsModal } = useSiteSettingsActions();

  return { openSettingsModal };
};
