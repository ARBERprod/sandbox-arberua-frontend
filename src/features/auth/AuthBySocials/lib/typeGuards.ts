import {
  AuthMessageEventData,
  AuthMessageEventType,
  RedirectAuthMessageEventData,
  ResponseAuthMessageEventData,
} from '../types/authMessageEvent';

export const isGoogleAuthMessageEvent = (data: any): data is AuthMessageEventData => (
  typeof data === 'object'
  && data !== null
  && 'type' in data
  && (
    data.type === AuthMessageEventType.OAuthProviderResponse
    || data.type === AuthMessageEventType.OAuthProviderRedirect
  )
);

export const isResponseMessageEventData = (data: AuthMessageEventData):
  data is ResponseAuthMessageEventData => data.type
  === AuthMessageEventType.OAuthProviderResponse;

export const isRedirectMessageEventData = (data: AuthMessageEventData):
  data is RedirectAuthMessageEventData => data.type
  === AuthMessageEventType.OAuthProviderRedirect;
