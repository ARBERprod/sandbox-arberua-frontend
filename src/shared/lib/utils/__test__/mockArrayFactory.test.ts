import { mockArrayFactory } from '../mockArrayFactory';

describe('Mock Array Factory', () => {
  const getMockData = () => ({
    id: '1',
    title: 'title',
  });

  const factory = mockArrayFactory(getMockData);

  it('Should create factory of mock data', () => {
    expect(typeof factory).toBe('function');
  });

  it('Should create 5 items of data, if no args passed', () => {
    const mockData = factory();
    expect(mockData.length).toBe(5);
  });

  it('Should create N items, when passing N param', () => {
    const mockData = factory(10);
    expect(mockData.length).toBe(10);
  });

  it('Should create mock data of passed type', () => {
    const mockData = factory(2);
    expect(mockData).toEqual([{
      id: '1',
      title: 'title',
    }, {
      id: '1',
      title: 'title',
    }]);
  });
});
