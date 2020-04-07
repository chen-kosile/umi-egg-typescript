import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/process/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeGetTeacher(params: any) {
  return request('/user/teacherInfos', {
    method: 'POST',
    data: params
  })
}
