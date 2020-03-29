import request from '@/utils/request';

export async function queryCurrent(): Promise<any> {
  return request('/user/currentUser', {
    method: 'GET'
  });
}

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
