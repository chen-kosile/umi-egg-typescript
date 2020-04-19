import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/completeInfo/submitInfo', {
    method: 'POST',
    data: params,
  });
}

export async function getTeacherList() {
  return request('/user/teacherList');
}