import qs from 'qs';

export const getQueryObj = (asPath: string) => {
  if (!asPath.includes('?')) return {};
  const [, queryString] = asPath.split('?');
  return qs.parse(queryString);
};
