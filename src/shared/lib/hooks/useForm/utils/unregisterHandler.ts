import _cloneDeep from 'lodash.clonedeep';
import _unset from 'lodash.unset';
import _get from 'lodash.get';
import _pullAt from 'lodash.pullat';

export const getArrayFieldName = (segments: string[]) => segments.slice(0, -1)
  .join('.');

export const isArrayElement = (segments: string[]): boolean => {
  const lastSegment = segments[segments.length - 1];
  return /^\d+$/.test(lastSegment);
};

export const unregisterHandler = (fieldName: string) => (prev: any) => {
  const newData = _cloneDeep(prev);
  const segments = fieldName.split('.');
  if (isArrayElement(segments)) {
    const array = _get(newData, getArrayFieldName(segments));
    const index = Number(segments[segments.length - 1]);
    _pullAt(array, Number(index));
  } else {
    _unset(newData, fieldName);
  }
  return newData;
};
