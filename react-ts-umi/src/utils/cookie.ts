import { userCookieKey } from '@/constants';
import { get, remove, set } from 'js-cookie';

export const cookieUtil = {
  setCookie: (name: string, value: string | object) => {
    set(name || userCookieKey, value)
  },
  getCookie: (name?: string) => {
    return get(name || userCookieKey);
  },
  removeCookie: (name?: string) => {
    remove(name || userCookieKey)
  }
}