import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { filtersManager } from './FiltersManager';

type UseUrlUpdateResult = { updateUrl: (value: any) => void };

export const useFilterUrlUpdate = (queryKey: string): UseUrlUpdateResult => {
  const {
    replace, query, pathname, asPath,
  } = useRouter();
  const updateUrl = useCallback(
    (value: any) => {
      const { filters } = query;
      const newFilters = filtersManager.getNewFilters(
        filters as string[],
        queryKey,
        value,
      );

      const basePath = filtersManager.getBasePath(query, pathname);
      const newUrl = filtersManager.getNewUrl(basePath, newFilters, asPath);

      replace(newUrl, newUrl, {
        scroll: false,
        shallow: true,
      });
    },
    [asPath, pathname, query, queryKey, replace],
  );

  return { updateUrl };
};
