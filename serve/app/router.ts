import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;
  const { login, validate, test } = controller;
  // api 版本的 访问路径前面加上apiV2Router的路径
  const apiV2Router: Router = app.router.namespace('/api/v2');

  // 邮箱校验码
  apiV2Router.post('/pass/getCaptcha', validate.getCaptcha); // 邮件下发校验码

  // 登录等
  apiV2Router.post('/register', login.register); // 注册
  apiV2Router.post('/login', login.loginIn); // 登录
  apiV2Router.get('/signout', login.signOut); // 退出登录

  // 兜底测试
  apiV2Router.all('*', test.index);
};
