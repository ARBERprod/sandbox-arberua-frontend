import { ParsedUrlQuery } from 'querystring';

export const getPageFromQuery = (query: ParsedUrlQuery) => {
  if (query.page) return Number(query.page);
  if (!query.filters) return 1;
  if (!Array.isArray(query.filters)) return 1;
  for (let i = 0; i < query.filters.length; i++) {
    const [key, value] = query.filters[i].split('=');
    if (key === 'page') {
      return Number(value);
    }
  }
  return 1;
};
