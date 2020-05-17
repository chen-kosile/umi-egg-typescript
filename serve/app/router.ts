import { Application, Router } from 'egg';

export default (app: Application) => {
  // api 版本的 访问路径前面加上apiV2Router的路径
  const apiV2Router: Router = app.router.namespace('/api/v2');
  const { controller } = app;
  const { login, validate, user, process, announce } = controller;

   // 挂载鉴权路由
   const github = app.passport.authenticate('github', {
    successRedirect: app.config.passportGithubSuccessRedirect, // 配置鉴权成功后的跳转地址
  });
  apiV2Router.get('/passport/github', github);
  apiV2Router.get('/passport/github/callback', github);

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
  apiV2Router.post('/process/getProcessList', process.getProcessList) // 个人列表
  apiV2Router.post('/process/getApproveList', process.getApproveList) // 审批列表
  apiV2Router.post('/process/changeProcessStatus', process.changeProcessStatus)
  apiV2Router.post('/process/deleteProcess', process.deleteProcess)
  // apiV2Router.post('/process/getSubmitList', process.getSubmitList) 
  // apiV2Router.post('/process/getApproveList', process.getApproveList) 

  // announce
  apiV2Router.post('/release/announce', announce.releaseAnnounce) // 发布
  // apiV2Router.post('/announce/bulkNotice', announce.bulkNotice) // 批量通知 

  // annalysis
  // apiV2Router.post('/annalysis/annalysisInfos', annalysis.annalysisInfos)

  // 兜底测试
  // apiV2Router.all('*', test.index);
};
