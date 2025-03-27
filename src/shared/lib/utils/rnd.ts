export const randomNumber = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

export const randomBool = () => randomNumber(0, 100) > 50;

export const getRandomArrayElement = <T extends any>(arr: T[]):T => arr[randomNumber(0, arr.length - 1)];
