import {
  CheckoutResponseDto,
  CheckoutResponseIdDto,
  CheckoutResponseUrlDto,
} from '@/features/CheckoutForm/api/types';

export const isCheckoutResponseUrlDto = (
  response: CheckoutResponseDto,
): response is CheckoutResponseUrlDto => response.redirect;

export const isCheckoutResponseIdDto = (
  response: CheckoutResponseDto,
): response is CheckoutResponseIdDto => !response.redirect;
