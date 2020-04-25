import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/release/announce', {
    method: 'POST',
    data: params,
  });
}
