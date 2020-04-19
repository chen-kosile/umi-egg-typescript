import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;
  const { login, validate, test, user, process } = controller;

   // 挂载鉴权路由
  app.passport.mount('github');

  // api 版本的 访问路径前面加上apiV2Router的路径
  const apiV2Router: Router = app.router.namespace('/api/v2');

  // 邮箱校验码
  apiV2Router.post('/pass/getCaptcha', validate.getCaptcha); // 邮件下发校验码

  // 登录等
  apiV2Router.post('/register', login.register); // 注册
  apiV2Router.post('/login/account', login.loginIn); // 登录
  apiV2Router.get('/signout', login.signOut); // 退出登录

  // github 登录
  // apiV2Router.get('/passport/github', github);
  // apiV2Router.get('/passport/github/callback', github);

  // user
  apiV2Router.get('/user/currentUser', user.userInfo) // 获取用户信息
  apiV2Router.post('/user/teacherInfos', user.teacherInfos)
  apiV2Router.get('/user/teacherList', user.teacherList);
  apiV2Router.post('/completeInfo/submitInfo', user.completeInfo);

  // process
  apiV2Router.post('/process/forms', process.submitProcess) // 提交
  apiV2Router.post('/process/getProcessList', process.getProceeList) // 个人列表
  // apiV2Router.post('/process/getSubmitList', process.getSubmitList) 
  // apiV2Router.post('/process/getApproveList', process.getApproveList) 
  // apiV2Router.post('/process/update', process.updateItem)
  // apiV2Router.post('/process/approve', process.approve)
  // apiV2Router.post('/process/refuse', process.refuseProcess)

  // announce
  // apiV2Router.post('/announce/release', announce.releaseAnnounce) // 发布
  // apiV2Router.post('/announce/bulkNotice', announce.bulkNotice) // 批量通知 

  // annalysis
  // apiV2Router.post('/annalysis/annalysisInfos', annalysis.annalysisInfos)

  // 兜底测试
  apiV2Router.all('*', test.index);
};
