import { useEffect } from 'react';

// eslint-disable-next-line no-undef
const getMobileDetect = (userAgent: NavigatorID['userAgent']) => {
  const isAndroid = () => Boolean(userAgent.match(/android/i));
  const isIos = () => Boolean(userAgent.match(/iphone|ipad|ipod/i));
  const isOpera = () => Boolean(userAgent.match(/opera mini/i));
  const isWindows = () => Boolean(userAgent.match(/iemobile/i));
  const isSSR = () => Boolean(userAgent.match(/ssr/i));
  const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = () => Boolean(!isMobile() && !isSSR());
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
};

export const useMobileDetect = () => {
  useEffect(() => {}, []);
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  return getMobileDetect(userAgent);
};
