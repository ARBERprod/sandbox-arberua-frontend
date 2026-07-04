import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import NextApp from 'next/app';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import localFont from 'next/font/local';
import '@/styles/globals.scss';
import { wrapper } from '@/shared/config/store/makeStore';
import cn from 'classnames';
import { FloatingProvider } from '@/shared/lib/components/FloatingProvider';
import { Cart } from '@/widgets/Cart';
import { AppLoader } from '@/layouts/AppLoader';
import { SettingsModal } from '@/features/SiteSettings';
import { ConfirmModalProvider } from '@/shared/lib/components/ConfirmModalProvider';
import { Auth } from '@/widgets/Auth';
import { CookieService } from '@/shared/lib/services/cookie.service';
import { UIActions } from '@/entities/UI';
import { COOKIE_VIEW_KEY } from '@/shared/constants/common';
import { CardView } from '@/shared/types/common';
import { NotificationsProvider } from '@/providers/NotificationProvider';
import { AuthBySocialsModals } from '@/features/auth/AuthBySocials';
import { BuyInOneClickCartDrawer } from '@/features/cart/BuyInOneClick';
import { PreorderProductProvider } from '@/features/PreOrderProduct';
import { CookieModal } from '@/features/CookieModal';
import { ExternalScripts } from '@/widgets/ExternalScripts';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Language } from '@/shared/config/lang';
import { useEffect } from 'react';
import { $api } from '@/shared/api/api';
import { sendEsEvent } from '@/shared/lib/analytics/esputnik';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter/Inter-light.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/inter/inter-regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/inter/Inter-medium.woff2',
      weight: '500',
    },
  ],
  display: 'swap',
});

function App({
  Component,
  ...rest
}: AppProps) {
  const {
    store,
    props,
  } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const { asPath, locale } = router;

  useEffect(() => {
    const handleRouteChange = () => {
      // if (typeof window !== 'undefined' && window?.fbq) {
      //   window?.fbq('track', 'PageView');
      // }
      $api.post(`${process.env.NEXT_PUBLIC_API_URL_V2}/events/pageView`);
      // eSputnik SPA page view (auto-pageview only fires on hard reload; routeChangeComplete does
      // not run on first mount, so no double-count). Separate system from the backend POST above.
      sendEsEvent('PageView');
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const hrefLangs = [
    { lang: 'x-default', path: '' },
    { lang: Language.UKRAINIAN, path: '' },
    { lang: Language.RUSSIAN, path: '/ru' },
    { lang: Language.ENGLISH, path: '/en' },
  ];

  return (
    <>
      <Head>
        {hrefLangs.map(({ lang, path }) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://arber.ua${path}${asPath}`}
          />
        ))}
        <link rel="canonical" href={`https://arber.ua${locale === 'ru' ? '/ru' : ''}${asPath}`} />
      </Head>
      <ExternalScripts />
      <FloatingProvider>
        <ConfirmModalProvider>
          <Provider store={store}>
            <NotificationsProvider>
              <AppLoader>
                <div className={cn(inter.className, 'app')}>
                  <NextNProgress color="#0E0E0E" />
                  <PreorderProductProvider>
                    <Component {...props.pageProps} />
                  </PreorderProductProvider>
                  <div id="portal" />
                  <Auth />
                  <AuthBySocialsModals />
                  <Cart />
                  <BuyInOneClickCartDrawer />
                  <SettingsModal withImage={false} />
                  <CookieModal />
                </div>
              </AppLoader>
            </NotificationsProvider>
          </Provider>
        </ConfirmModalProvider>
      </FloatingProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps((store) => async (ctx) => {
  const { req, res } = ctx.ctx;
  const cookiesService = new CookieService({ req, res });
  store.dispatch(UIActions.setView(cookiesService.get(COOKIE_VIEW_KEY) || CardView.BIG));
  return {
    pageProps: {
      ...(await NextApp.getInitialProps(ctx)).pageProps,
    },
  };
});

export default appWithTranslation(App);
