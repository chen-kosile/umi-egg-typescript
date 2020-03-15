import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/v2/user/getUsers');
}

export async function queryCurrent(): Promise<any> {
  return request('/user/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/notices');
}

export async function createToken(): Promise<any> {
  return request('/user/createToken');
}

export async function queryVerifyToken(): Promise<any> {
  return request('/user/verifyToken');
}