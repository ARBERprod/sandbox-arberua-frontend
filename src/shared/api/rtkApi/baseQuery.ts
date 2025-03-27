import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ThunkExtraArg } from '@/shared/types/store';
import { tokenService } from '@/shared/lib/services/token.service';
import { LANG_COOKIE_KEY, Language } from '@/shared/config/lang';
import { cookieService } from '@/shared/lib/services/cookie.service';

function getLang(extra?: ThunkExtraArg): Language {
  const getSsrLang = () => {
    const context = extra?.context;
    if (!context) return undefined;
    if ('locale' in context) {
      return context.locale;
    }
    if ('ctx' in context && 'locale' in context.ctx) {
      return context.ctx.locale;
    }
    if ('req' in context && context.req && 'cookies' in context.req) {
      return context.req.cookies.slang;
    }
    return undefined;
  };
  const ssrLang = getSsrLang();
  const clientLang = cookieService.get(LANG_COOKIE_KEY);
  return (ssrLang || clientLang || Language.UKRAINIAN) as Language;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.arber.ua/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { extra }) => {
    const csrfToken = tokenService.getXSCRFToken();
    if (csrfToken) {
      headers.set('X-XSRF-TOKEN', csrfToken);
    }
    const lang = getLang(extra as ThunkExtraArg);
    headers.set('X-localization', lang);
    headers.set('X-country', 'ua');
    headers.set('Accept', 'application/json');
    return headers;
  },
});
