import { getQueryObj } from '../../utils/url';
import qs from 'qs';

export const getNewPageUrl = (page: number, asPath: string) => {
  let newUrl = asPath;
  const queryObj = getQueryObj(asPath);
  if (page === 1) {
    delete queryObj.page;
  } else {
    queryObj.page = String(page);
  }

  const newQs = qs.stringify(queryObj);
  const [basePath] = asPath.split('?');
  if (!newQs) return basePath;
  newUrl = `${basePath}?${newQs}`;

  return newUrl;
};
