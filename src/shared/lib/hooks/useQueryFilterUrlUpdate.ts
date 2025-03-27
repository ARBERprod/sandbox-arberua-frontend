import { useCallback } from 'react';
import { useRouter } from 'next/router';
import qs, { ParsedQs } from 'qs';
import { ParsedUrlQuery } from 'querystring';

type UseUrlUpdateResult = { updateUrl: (value: any) => void };

const getNewQuery = (query: ParsedUrlQuery, queryKey: string, value: any): ParsedQs => {
  const queryObj = qs.parse(qs.stringify(query));
  delete queryObj.page;

  if (!(queryKey in queryObj)) {
    queryObj[queryKey] = value;
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      delete queryObj[queryKey];
    } else {
      queryObj[queryKey] = value;
    }
  } else if (!value) {
    delete queryObj[queryKey];
  } else {
    queryObj[queryKey] = value;
  }

  return queryObj;
};

const getNewQueryString = (queryObj: ParsedQs): string => Object.entries(queryObj)
  .reduce((acc: string[], [key, value]) => {
    if (Array.isArray(value)) {
      // eslint-disable-next-line no-param-reassign
      acc.push(`${key}=${value.join(',')}`);
    } else {
      // eslint-disable-next-line no-param-reassign
      acc.push(`${key}=${value}`);
    }
    return acc;
  }, [])
  .join('&');

export const useQueryFilterUrlUpdate = (queryKey: string): UseUrlUpdateResult => {
  const { replace, query, pathname } = useRouter();
  const updateUrl = useCallback(
    (value: any) => {
      const newQuery = getNewQuery(query, queryKey, value);
      const queryString = getNewQueryString(newQuery);
      replace(
        {
          pathname,
          query: queryString,
        },
        undefined,
        { scroll: false, shallow: true },
      );
    },
    [pathname, query, queryKey, replace],
  );

  return { updateUrl };
};
