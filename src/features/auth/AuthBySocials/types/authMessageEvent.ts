export enum AuthMessageEventType {
  OAuthProviderRedirect = 'oauthProviderRedirect',
  OAuthProviderResponse = 'oauthProviderResponse'
}

interface AuthMessageEventDataBase {
  success: true;
  type: AuthMessageEventType;
}

export interface ResponseAuthMessageEventData extends AuthMessageEventDataBase {
  type: AuthMessageEventType.OAuthProviderResponse;
  payload: {
    access_token: string;
    token_type: string;
  }
}

export interface RedirectAuthMessageEventData extends AuthMessageEventDataBase {
  type: AuthMessageEventType.OAuthProviderRedirect;
  payload: {
   email: string;
   first_name: string;
   last_name: string;
   provider: string;
   provider_id: string;
  }
}

export type AuthMessageEventData = RedirectAuthMessageEventData | ResponseAuthMessageEventData
