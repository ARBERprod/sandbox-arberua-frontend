import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { isRouteIncluded } from '../utils/isRouteIncluded';

export const BinotelWidget = () => {
  const router = useRouter();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const baseRoutesWithoutScript = ['/office'];
  const shouldIncludeScript = !baseRoutesWithoutScript.some((baseRoute) => isRouteIncluded(baseRoute, router.pathname));

  useEffect(() => {
    if (shouldIncludeScript && !scriptRef.current) {
      const script = document.createElement('script');
      script.id = 'binotel-widget';
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//widgets.binotel.com/getcall/widgets/hcm0qlk4p7274fuvd5fl.js';

      document.body.appendChild(script);

      scriptRef.current = script;
    } else if (!shouldIncludeScript && scriptRef.current) {
      ['bingc-phone-button', 'bingc-passive', 'bingc-active'].forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.style.display = 'none';
        }
      });
    } else if (shouldIncludeScript && scriptRef.current) {
      ['bingc-phone-button', 'bingc-passive', 'bingc-active'].forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.style.display = '';
        }
      });
    }
  }, [shouldIncludeScript]);

  return null;
};
