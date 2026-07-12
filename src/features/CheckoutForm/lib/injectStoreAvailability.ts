import { RadioOption } from '@/shared/ui/Form/RadioField';

// Inject `disabled` into the store delivery option from a SECOND source
// (pickup availability), without polluting the pure DeliveryMethod→option
// mapper (per the pickup design contract).
export const injectStoreDisabled = (
  options: RadioOption[],
  storeMethodId: string | undefined,
  disabled: boolean,
): RadioOption[] => {
  if (!storeMethodId || !disabled) return options;
  return options.map((option) => (
    option.value === storeMethodId ? { ...option, disabled: true } : option
  ));
};
