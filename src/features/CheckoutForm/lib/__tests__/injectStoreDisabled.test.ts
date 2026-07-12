import { RadioOption } from '@/shared/ui/Form/RadioField';
import { injectStoreDisabled } from '../injectStoreDisabled';

const options: RadioOption[] = [
  { value: 'dm-np', label: 'Нова Пошта' },
  { value: 'dm-store', label: 'Самовивіз з магазину' },
];

describe('injectStoreDisabled', () => {
  it('disables ONLY the store option when pickup is unavailable', () => {
    const result = injectStoreDisabled(options, 'dm-store', true);
    expect(result).toEqual([
      { value: 'dm-np', label: 'Нова Пошта' },
      { value: 'dm-store', label: 'Самовивіз з магазину', disabled: true },
    ]);
  });

  it('leaves options untouched when pickup is available', () => {
    const result = injectStoreDisabled(options, 'dm-store', false);
    expect(result).toBe(options);
  });

  it('is a no-op when there is no store method id', () => {
    const result = injectStoreDisabled(options, undefined, true);
    expect(result).toBe(options);
  });
});
