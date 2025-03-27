import { useRouter } from 'next/router';
import { getNewPageUrl } from './utils';
import { useCallback } from 'react';

export const useUpdatePageUrl = () => {
  const { replace, asPath } = useRouter();
  const updateUrl = useCallback((page: number) => {
    const newUrl = getNewPageUrl(page, asPath);

    replace(newUrl, newUrl, {
      scroll: false,
      shallow: true,
    });
  }, [asPath, replace]);

  return { updateUrl };
};
