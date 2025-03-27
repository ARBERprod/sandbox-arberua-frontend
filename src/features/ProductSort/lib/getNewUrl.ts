import qs from 'qs';
import { getQueryObj } from '@/shared/lib/utils/url';

export const getNewUrl = (sort: string, asPath: string) => {
  let newUrl = asPath;
  const queryObj = getQueryObj(asPath);
  if (sort === '') {
    delete queryObj.sort;
  } else {
    queryObj.sort = String(sort);
  }

  const newQs = qs.stringify(queryObj);
  const [basePath] = asPath.split('?');
  if (!newQs) return basePath;
  newUrl = `${basePath}?${newQs}`;

  return newUrl;
};
