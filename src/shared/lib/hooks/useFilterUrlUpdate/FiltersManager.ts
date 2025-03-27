import qs from 'qs';
import { ParsedUrlQuery } from 'querystring';
import { getQueryObj } from '@/shared/lib/utils/url';

type FiltersObj = {
  [key: string]: string | string[];
};

class FiltersManager {
  private parseFilters(
    filters: string | undefined,
    arrayValueSeparator = ',',
    segmentsSeparator: string | RegExp = /;/g,
  ): FiltersObj {
    if (!filters) return {};

    let filtersObj = qs.parse(filters.replaceAll(segmentsSeparator, '&'));
    filtersObj = Object.entries(filtersObj).reduce((acc, [key, value]) => {
      if (!value || typeof value !== 'string') {
        return acc;
      }
      if (value.includes(arrayValueSeparator)) {
        acc[key] = value.split(arrayValueSeparator);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as FiltersObj);

    return filtersObj as FiltersObj;
  }

  private parseFiltersArray(filters: string[] | undefined): FiltersObj {
    if (!filters) return {};
    const filtersString = filters.join('/');

    return this.parseFilters(filtersString, ';', '/');
  }

  private mapFiltersObjectToFiltersArray(filterObj: FiltersObj): string[] {
    return Object.entries(filterObj).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc.push(`${key}=${value.join(';')}`);
      } else {
        acc.push(`${key}=${value}`);
      }
      return acc;
    }, [] as string[]);
  }

  getNewFilters(
    filters: string[] | undefined,
    queryKey: string,
    value: string | string[],
  ): string[] {
    const filtersObj = this.parseFiltersArray(filters);

    if (!(queryKey in filtersObj)) {
      filtersObj[queryKey] = value;
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        delete filtersObj[queryKey];
      } else {
        filtersObj[queryKey] = value;
      }
    } else if (!value) {
      delete filtersObj[queryKey];
    } else {
      filtersObj[queryKey] = value;
    }

    return this.mapFiltersObjectToFiltersArray(filtersObj);
  }

  getBasePath(query: ParsedUrlQuery, pathname: string): string {
    let result = pathname.replace('/[[...filters]]', '');
    if (!result.includes('[')) return result;
    const matches = result.match(/\[[a-z\d]*]/gi);
    if (!matches) return result;
    matches.forEach((match) => {
      const dynamicKey = match.slice(1, -1);
      result = result.replaceAll(match, query[dynamicKey] as string);
    });

    return result;
  }

  getNewUrl(basePath: string, newFilters: string[], asPath: string): string {
    const queryObj = getQueryObj(asPath);
    delete queryObj.page;

    const newQs = qs.stringify(queryObj);
    if (!newQs) return `${basePath}/${newFilters.join('/')}`;
    return `${basePath}/${newFilters.join('/')}?${newQs}`;
  }
}

export const filtersManager = new FiltersManager();
