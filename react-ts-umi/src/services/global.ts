import { Get } from '@/utils/request';

export async function fetchNotices(params) {
  return Get('notices', params);
}
