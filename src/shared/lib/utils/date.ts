export const getNoun = (number: number, one: string, two: string, five: string) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

export const secondsToDhms = (seconds: number, one: string, two: string, five: string) => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? `${d} ${getNoun(d, one, two, five)} ` : '';
  const hDisplay = `${String(h).padStart(2, '0')}:`;
  const mDisplay = `${String(m).padStart(2, '0')}:`;
  const sDisplay = `${String(s).padStart(2, '0')}`;
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
