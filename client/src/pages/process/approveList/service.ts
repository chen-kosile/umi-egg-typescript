import request from '@/utils/request';
// import { TableListParams } from './data.d';

export async function queryApproveList(params: any) {
  return request('/process/getApproveList', {
    method: 'POST',
    data: params,
  });
}

export async function queryApproveProcess(processId: number) {
  return request('/process/changeProcessStatus', {
    method: 'POST',
    data: {
      processId,
      status: 2
    },
  });
}

export async function queryRefuseProcess(processId: number) {
  return request('/process/changeProcessStatus', {
    method: 'POST',
    data: {
      processId,
      status: 3
    },
  });
}
