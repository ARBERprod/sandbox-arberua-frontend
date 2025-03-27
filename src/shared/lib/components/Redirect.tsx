import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { routerPaths } from '@/shared/config/router';

interface RedirectProps {
  path?: string;
  replace?: boolean;
}

export const Redirect = memo(({ replace, path = routerPaths.main }: RedirectProps) => {
  const { replace: replaceFn, push } = useRouter();
  useEffect(() => {
    if (replace) {
      replaceFn(path);
    } else {
      push(path);
    }
  }, [path, push, replace, replaceFn]);
  return null;
});
