import { cookieService, CookieService } from '@/shared/lib/services/cookie.service';

export class CookieModalManager {
  private readonly COOKIE_MODAL_COOKIE_KEY = 'acceptedCookies';
  private readonly cookieService: CookieService;

  constructor(cookieService: CookieService) {
    this.cookieService = cookieService;
  }

  isCookiesAccepted(): boolean {
    return Boolean(this.cookieService.get<boolean>(this.COOKIE_MODAL_COOKIE_KEY));
  }

  acceptAll() {
    if (!this.isCookiesAccepted()) {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 7);
      this.cookieService.set(this.COOKIE_MODAL_COOKIE_KEY, 'true', { expires: expiresDate });
    } else {
      console.log('Согласие на использование кук уже получено.');
    }
  }
}

export const cookieModalManager = new CookieModalManager(cookieService);
