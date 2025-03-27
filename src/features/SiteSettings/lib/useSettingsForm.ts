import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { LANG_COOKIE_KEY, Language } from '@/shared/config/lang';
import { CITY_COOKIE_KEY, COUNTRY_COOKIE_KEY, useCitySearch } from '@/entities/Location';
import { cookieService } from '@/shared/lib/services/cookie.service';
import { useSiteSettingsActions } from '../model/slices/siteSettingsSlice';
import { SettingsFormData } from '../model/types/SettingsFormData';
import { useUserCity } from '@/entities/Session';

export const useSettingsForm = () => {
  const {
    i18n,
  } = useTranslation();
  const { reload } = useRouter();
  const { closeSettingsModal } = useSiteSettingsActions();
  const { isLoading, options: cityOptions, queryChangeHandler } = useCitySearch();

  const userCity = useUserCity();

  const initialState: SettingsFormData = useMemo(() => ({
    city: userCity?.id || '',
    language: i18n.language as Language,
    country: '',
  }), [i18n.language, userCity?.id]);

  const onSubmit = useCallback(async (data:SettingsFormData) => {
    cookieService.set(LANG_COOKIE_KEY, data.language);
    cookieService.set(CITY_COOKIE_KEY, data.city);
    cookieService.set(COUNTRY_COOKIE_KEY, data.country);
    closeSettingsModal();
    reload();
  }, [closeSettingsModal, reload]);

  return {
    isLoading,
    cityOptions,
    queryChangeHandler,
    onSubmit,
    initialState,
  };
};
