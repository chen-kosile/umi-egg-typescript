import request from '@/utils/request';
import { UserRegisterParams, CaptchaValidate } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryCaptcha(params: { email: string}) {
  return request('/pass/getCaptcha', {
    method: 'POST',
    data: params
  })
}

export async function queryValidateCaptcha(params: CaptchaValidate) {
  return request('/pass/validateCaptcha', {
    method: 'POST',
    data: params
  })
}