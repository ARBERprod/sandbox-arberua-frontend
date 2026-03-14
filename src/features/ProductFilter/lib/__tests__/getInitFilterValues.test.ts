import { FilterType, FilterItem } from '@/entities/Filter';
import { getInitFilterValues } from '../getInitFilterValues';

describe('getInitFilterValues', () => {
  it('should return chosen checkbox values as array of slugs', () => {
    const filters: FilterItem[] = [
      {
        type: FilterType.CHECKBOX,
        slug: 'color',
        title: 'Color',
        values: [
          { slug: 'red', title: 'Red', is_chosen: true },
          { slug: 'green', title: 'Green', is_chosen: false },
          { slug: 'blue', title: 'Blue', is_chosen: true },
        ],
      },
    ];

    const result = getInitFilterValues(filters);
    expect(result).toEqual({ color: ['red', 'blue'] });
  });

  it('should return empty array for checkbox with no chosen values', () => {
    const filters: FilterItem[] = [
      {
        type: FilterType.CHECKBOX,
        slug: 'size',
        title: 'Size',
        values: [
          { slug: 'm', title: 'M', is_chosen: false },
          { slug: 'l', title: 'L', is_chosen: false },
        ],
      },
    ];

    const result = getInitFilterValues(filters);
    expect(result).toEqual({ size: [] });
  });

  it('should return chosen radio value as string', () => {
    const filters: FilterItem[] = [
      {
        type: FilterType.RADIO,
        slug: 'sex',
        title: 'Gender',
        values: [
          { slug: 'male', title: 'Male', is_chosen: true },
          { slug: 'female', title: 'Female', is_chosen: false },
        ],
      },
    ];

    const result = getInitFilterValues(filters);
    expect(result).toEqual({ sex: 'male' });
  });

  it('should not set radio key when no value is chosen', () => {
    const filters: FilterItem[] = [
      {
        type: FilterType.RADIO,
        slug: 'sex',
        title: 'Gender',
        values: [
          { slug: 'male', title: 'Male', is_chosen: false },
          { slug: 'female', title: 'Female', is_chosen: false },
        ],
      },
    ];

    const result = getInitFilterValues(filters);
    expect(result).toEqual({});
  });

  it('should handle mixed checkbox and radio filters', () => {
    const filters: FilterItem[] = [
      {
        type: FilterType.CHECKBOX,
        slug: 'color',
        title: 'Color',
        values: [
          { slug: 'red', title: 'Red', is_chosen: true },
          { slug: 'green', title: 'Green', is_chosen: false },
        ],
      },
      {
        type: FilterType.RADIO,
        slug: 'sex',
        title: 'Gender',
        values: [
          { slug: 'male', title: 'Male', is_chosen: false },
          { slug: 'female', title: 'Female', is_chosen: true },
        ],
      },
    ];

    const result = getInitFilterValues(filters);
    expect(result).toEqual({
      color: ['red'],
      sex: 'female',
    });
  });

  it('should return empty object for empty filters array', () => {
    const result = getInitFilterValues([]);
    expect(result).toEqual({});
  });
});
