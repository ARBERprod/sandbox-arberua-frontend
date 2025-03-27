import { localStorageService } from './localStorage.service';
import { cookieService } from '@/shared/lib/services/cookie.service';

const STORAGE_TOKEN_KEY = 'arber/accessToken';
const XCSRF_TOKEN_KEY = 'XSRF-TOKEN';

class TokenService {
  getToken(): string | null {
    const lsToken = localStorageService.get<string>(STORAGE_TOKEN_KEY);
    if (lsToken) return lsToken;

    return null;
  }

  setToken(token: string) {
    localStorageService.set(STORAGE_TOKEN_KEY, token);
  }

  removeToken() {
    localStorageService.remove(STORAGE_TOKEN_KEY);
  }

  getXSCRFToken(): string | null {
    return cookieService.get(XCSRF_TOKEN_KEY);
  }
}

export const tokenService = new TokenService();
