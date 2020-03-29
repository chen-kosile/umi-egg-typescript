import request from '@/utils/request';

export async function queryCurrent(): Promise<any> {
  return request('/user/currentUser', {
    method: 'GET'
  });
}

export async function queryFakeList(params: { count: number }) {
  return request('/fake_list', {
    params,
  });
}
