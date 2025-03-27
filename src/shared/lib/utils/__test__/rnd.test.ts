import { getRandomArrayElement, randomBool, randomNumber } from '@/shared/lib/utils/rnd';

export { getRandomArrayElement } from '../rnd';

const spyRandom = jest.spyOn(Math, 'random');

describe('rnd', () => {
  afterEach(() => {
    spyRandom.mockClear();
  });

  describe('When Math.random() returns 0', () => {
    beforeEach(() => {
      spyRandom.mockReturnValue(0);
    });

    describe('randomNumber', () => {
      it('Should return min passed value', () => {
        const result = randomNumber(4, 10);

        expect(result).toBe(4);
      });
    });

    describe('randomBool', () => {
      it('Should return false', () => {
        const bool = randomBool();

        expect(bool).toBe(false);
      });
    });
  });

  describe('When Math.random() returns 0.5', () => {
    beforeEach(() => {
      spyRandom.mockReturnValue(0.5);
    });

    describe('randomNumber', () => {
      it('randomNumber(4, 10) should return 7', () => {
        const result = randomNumber(4, 10);

        expect(result).toBe(7);
      });
    });
  });

  describe('When Math.random() returns 0.9999', () => {
    beforeEach(() => {
      spyRandom.mockReturnValue(0.9999);
    });

    describe('randomNumber', () => {
      it('Should return max passed value', () => {
        const result = randomNumber(4, 10);

        expect(result).toBe(10);
      });
    });

    describe('randomBool', () => {
      it('Should return true', () => {
        const bool = randomBool();

        expect(bool).toBe(true);
      });
    });
  });

  describe('getRandomArrayElement', () => {
    it('Should return undefined, if passed empty array', () => {
      const arr:any[] = [];

      const result = getRandomArrayElement(arr);

      expect(result).toBe(undefined);
    });

    it('Should return first element, if Math.random returns 0', () => {
      spyRandom.mockReturnValue(0);
      const arr = [1, 2, 3, 4, 5, 6];

      const result = getRandomArrayElement(arr);

      expect(result).toBe(1);
    });

    it('Should return last element, if Math.random returns 0.9999', () => {
      spyRandom.mockReturnValue(0.9999);
      const arr = [1, 2, 3, 4, 5, 6];

      const result = getRandomArrayElement(arr);

      expect(result).toBe(6);
    });

    it('Should return middle element, if Math.random returns 0.5', () => {
      spyRandom.mockReturnValue(0.5);
      const arr = [1, 2, 3, 4, 5, 6, 7];

      const result = getRandomArrayElement(arr);

      expect(result).toBe(4);
    });
  });
});
