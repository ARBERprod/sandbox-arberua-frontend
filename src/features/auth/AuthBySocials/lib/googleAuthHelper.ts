class GoogleAuthHelper {
  private GOOGLE_AUTH_API_URL = 'https://api.arber.ua/session/social/google/redirect';

  public getUrl() {
    return this.GOOGLE_AUTH_API_URL;
  }
}

export const googleAuthHelper = new GoogleAuthHelper();
