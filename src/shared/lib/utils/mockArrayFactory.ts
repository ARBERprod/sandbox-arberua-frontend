export const mockArrayFactory = <T>(
  factory: () => T,
): (length?: number) => T[] => (length = 5) => new Array(length).fill(0).map(factory);
