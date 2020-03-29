import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeLogout() {
  return request('/signout', {
    method: 'GET'
  })
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/login/captcha?mobile=${mobile}`);
}
