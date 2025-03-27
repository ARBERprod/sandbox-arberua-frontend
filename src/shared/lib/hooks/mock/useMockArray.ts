import { useEffect, useState } from 'react';

export const useMockArray = <T>(data:T[]) => {
  const [mockData, setMockData] = useState<T[]>([] as T[]);
  useEffect(() => {
    setMockData(data);
    // eslint-disable-next-line
  }, []);

  return mockData;
};
