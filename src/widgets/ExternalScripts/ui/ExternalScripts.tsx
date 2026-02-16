import Script from 'next/script';

const GTM_ID = 'GTM-PHHD7CTQ';
const CHATBULLET_ABON_CODE = 5930366;

export const ExternalScripts = () => (
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
    <Script
      id="chatbullet"
      src="https://livechat.chatbullet.com"
      strategy="afterInteractive"
      data-config={JSON.stringify({
        btnSize: 'small',
        primaryColor: '#0b87e7',
        abonCode: CHATBULLET_ABON_CODE,
      })}
    />
  </>
);
