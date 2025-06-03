import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Google Tag Manager (noscript) */}
        {/* <noscript> */}
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        {/* <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PHHD7CTQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript> */}
        {/* End Google Tag Manager (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://www.facebook.com/tr?id=1440826369354364&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </Html>
  );
}
