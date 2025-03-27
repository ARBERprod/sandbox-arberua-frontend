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
import { ChatWidget } from '@/widgets/ChatWidget';
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
import { GoToPageTopFAB } from '@/shared/ui/GoToPageTopFAB';
import { PreorderProductProvider } from '@/features/PreOrderProduct';
import { CookieModal } from '@/features/CookieModal';
import { BinotelWidget } from '@/widgets/Binotel';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Language } from '@/shared/config/lang';
import Script from 'next/script';
import { useEffect } from 'react';
import { $api } from '@/shared/api/api';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter/Inter-light.woff',
      weight: '300',
    },
    {
      path: '../../public/fonts/inter/Inter-light.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/inter/inter-regular.woff',
      weight: '400',
    },
    {
      path: '../../public/fonts/inter/inter-regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/inter/Inter-medium.woff',
      weight: '500',
    },
    {
      path: '../../public/fonts/inter/Inter-medium.woff2',
      weight: '500',
    },
  ],
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
      if (typeof window !== 'undefined' && window?.fbq) {
        window?.fbq('track', 'PageView');
      }
      $api.post(`${process.env.NEXT_PUBLIC_API_URL_V2}/events/pageView`);
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
      <Script
        id="facebook-pixel"
        strategy="beforeInteractive"
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1440826369354364');
          fbq('track', 'PageView');
        `}
      </Script>
      <Script
        id="gtm"
        strategy="beforeInteractive"
      >
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            console.log({f, j, dl, i, w,d,s,l});
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PHHD7CTQ');
        `}
      </Script>
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
                  <ChatWidget />
                  <GoToPageTopFAB />
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
          <BinotelWidget />
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
