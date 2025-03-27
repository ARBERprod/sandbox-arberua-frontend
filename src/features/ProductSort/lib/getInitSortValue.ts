import { ParsedUrlQuery } from 'querystring';

export const getInitSortValue = (query:ParsedUrlQuery):string => query.sort as string || '';
