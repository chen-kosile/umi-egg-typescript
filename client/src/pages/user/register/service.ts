import request from '@/utils/request';
import { UserRegisterParams, CaptchaValidate } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/v2/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaptcha(params: { email: string}) {
  return request('/api/v2/pass/getCaptcha', {
    method: 'POST',
    data: params
  })
}

export async function queryValidateCaptcha(params: CaptchaValidate) {
  return request('/api/v2/pass/validateCaptcha', {
    method: 'POST',
    data: params
  })
}