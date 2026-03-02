import { Middleware } from '@reduxjs/toolkit';
import { sessionApi } from '@/entities/Session/api/sessionApi';
import { esputnikSubscribeOnRegistration, esputnikPasswordResetRequested } from './esputnikClient';

// Detect the current language from the document or default to 'uk'
function getCurrentLang(): string {
  if (typeof document !== 'undefined') {
    return document.documentElement.lang || 'uk';
  }
  return 'uk';
}

export const esputnikMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  // 4.1 Registration — Subscribe contact on successful sign-up
  if (sessionApi.endpoints.signUp.matchFulfilled(action)) {
    const signUpData = action.meta.arg.originalArgs;
    esputnikSubscribeOnRegistration({
      email: signUpData.email,
      firstName: signUpData.first_name,
      lastName: signUpData.last_name,
      phone: signUpData.phone,
      lang: getCurrentLang(),
      birthday: signUpData.birthday,
    });
  }

  // 4.4 Password reset requested
  if (sessionApi.endpoints.forgetPassword.matchFulfilled(action)) {
    const forgotData = action.meta.arg.originalArgs;
    esputnikPasswordResetRequested({
      email: forgotData.email,
    });
  }

  return result;
};
