import { useEffect, useState } from 'react';

export const useMockObject = <T extends Record<string, any>>(data:T) => {
  const [mockObject, setMockObject] = useState({} as T);
  useEffect(() => {
    setMockObject(data);
    // eslint-disable-next-line
  }, []);
  return mockObject;
};
