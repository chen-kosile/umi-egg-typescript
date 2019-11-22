import { Get } from '@/utils/request';

async function fetchList(params) {
  return Get('actions/list', params)
}

export default {
  fetchList,
}