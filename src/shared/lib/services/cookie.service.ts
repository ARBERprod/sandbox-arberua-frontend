import {
  getCookie, setCookie, getCookies, deleteCookie,
} from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { CookieSerializeOptions } from 'cookie';

interface CookieServiceOptions extends CookieSerializeOptions {
  res?: ServerResponse;
  req?: IncomingMessage & {
    cookies?: { [key: string]: string } | Partial<{ [key: string]: string }>;
  };
}

export class CookieService {
  private readonly options: CookieServiceOptions;

  constructor(options?: CookieServiceOptions) {
    const isDev = process.env.NODE_ENV === 'development';
    const defaultOptions = isDev ? {} : { domain: '.arber.ua' };
    this.options = { ...defaultOptions, ...options };
  }

  get<T extends string | boolean = string>(name: string, options?: CookieSerializeOptions): T | null {
    const value = getCookie(name, { ...this.options, ...options });
    if (!value) return null;
    return value as T;
  }

  set(name: string, value: any, options?: CookieSerializeOptions) {
    setCookie(name, value, { ...this.options, ...options });
  }

  getAll(options?: CookieSerializeOptions) {
    return getCookies({ ...this.options, ...options });
  }

  delete(name: string, options?: CookieSerializeOptions) {
    deleteCookie(name, { ...this.options, ...options });
  }
}

export const cookieService = new CookieService();
