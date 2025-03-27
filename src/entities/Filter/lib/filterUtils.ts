import { ParsedUrlQuery } from 'querystring';
import qs, { ParsedQs } from 'qs';

export class FilterUtils {
  static getFilterStringFromQuery(query: string | string[] | undefined, filtersIndex = 1):string {
    if (!query) return '';
    if (Array.isArray(query)) return query[filtersIndex]?.replaceAll(';', '&') || '';
    return query.replaceAll(';', '&');
  }

  static getFilterStringFromQueryArray(query?: string[]):string {
    if (!query) return '';
    return query.join('&').replaceAll(/;/g, ',');
  }

  private static getFiltersFromQuery(query: ParsedUrlQuery): ParsedQs {
    const queryString = qs.stringify(query);
    const queryObj = qs.parse(queryString);
    if ('page' in queryObj) {
      delete queryObj.page;
    }
    if ('sort' in queryObj) {
      delete queryObj.sort;
    }
    if ('q' in queryObj) {
      delete queryObj.q;
    }
    if ('price' in queryObj && typeof queryObj.price === 'string') {
      queryObj.price = queryObj.price.split(',').join('-');
    }

    return queryObj;
  }

  static getFiltersStringFromQuery(query: ParsedUrlQuery): string {
    const queryObj = FilterUtils.getFiltersFromQuery(query);
    return Object.entries(queryObj)
      .reduce((acc: string[], [key, value]) => {
        acc.push(`${key}=${value as string}`);
        return acc;
      }, [])
      .join('&');
  }
}
