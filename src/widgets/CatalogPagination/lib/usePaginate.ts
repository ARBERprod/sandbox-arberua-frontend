import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPageFromQuery } from './utils';
import { useUpdatePageUrl } from '@/shared/lib/hooks/usePageUrlUpdate';

type UsePaginateParams = {
  useStatePage?: boolean;
};

export const usePaginate = (options?: UsePaginateParams) => {
  const { query } = useRouter();
  const { updateUrl } = useUpdatePageUrl();

  const page = getPageFromQuery(query);
  const [statePage, setStatePage] = useState(1);
  const [merge, setMerge] = useState(false);

  useEffect(() => {
    if (!options?.useStatePage) {
      setMerge(false);
    }

    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (options?.useStatePage) {
      setMerge(false);
    }

    // eslint-disable-next-line
  }, [statePage, options?.useStatePage]);

  const moreBtnClickHandler = () => {
    if (options?.useStatePage) {
      setStatePage((prev) => prev + 1);
    } else {
      updateUrl(page + 1);
    }
    setMerge(true);
  };

  const pageChangeHandler = (page: number) => {
    if (options?.useStatePage) {
      setStatePage(page);
    } else {
      updateUrl(page);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    merge,
    page: options?.useStatePage ? statePage : page,
    pageChangeHandler,
    moreBtnClickHandler,
  };
};
