import { Get } from '@/utils/request';

export async function fetchList(params) {
  return Get('actions/list', params)
}