import { Get } from '@/utils/request';

async function fetchNotices(params) {
  return Get('notices', params);
}

export {
  fetchNotices,
}