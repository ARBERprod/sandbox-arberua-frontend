import Script from 'next/script';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { cookieModalManager } from '@/features/CookieModal/lib/CookieModalManager';

const GTM_ID = 'GTM-PHHD7CTQ';

export const ExternalScripts = () => {
  const { t } = useTranslation();

  // Resolve the eSputnik site id on the client only: gated on the kill-switch flag,
  // consent, and a configured site id. Deferring to an effect avoids an SSR/CSR
  // hydration mismatch (consent lives in a browser cookie).
  const [esputnikSiteId, setEsputnikSiteId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const trackingEnabled = process.env.NEXT_PUBLIC_ESPUTNIK_TRACKING_ENABLED === 'true';
    const siteId = process.env.NEXT_PUBLIC_ESPUTNIK_SITE_ID;

    if (trackingEnabled && siteId && cookieModalManager.isCookiesAccepted()) {
      setEsputnikSiteId(siteId);
    }
  }, []);

  const chatbulletConfig = JSON.stringify({
    btnSize: 'small',
    primaryColor: '#0b87e7',
    abonCode: 5930366,
    invitations: {
      invitationText: t('chatbullet.invitation_text'),
      messageTime: 99999,
      timeAfterClose: 5,
      timeAfterInvite: 3,
    },
  });

  return (
    <>
      <Script
        id="gtm"
        strategy="lazyOnload"
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
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {esputnikSiteId && (
        <Script
          id="esputnik-webtracking"
          src={`https://statics.esputnik.com/scripts/${esputnikSiteId}.js`}
          strategy="lazyOnload"
        />
      )}

      <Script
        id="chatbullet"
        src="https://livechat.chatbullet.com/widget.chatbullet.js"
        defer
        strategy="afterInteractive"
        data-config={chatbulletConfig}
      />
    </>
  );
};
