export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomEventId() {
  return String(getRandomInt(100000000, 999999999));
}
