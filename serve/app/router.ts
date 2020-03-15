import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;
  const { login, validate } = controller;
  const apiV2Router: Router = app.router.namespace('/api/v2');
  // api 版本的 访问路径前面加上apiV2Router的路径
  apiV2Router.get('/pass/getCaptcha', validate.getCaptcha);
  apiV2Router.get('/pass/validateCaptcha', validate.validateCaptcha);
  apiV2Router.post('/register', login.register); // 注册
  apiV2Router.post('/login', login.loginIn); // 登录
  apiV2Router.get('/signout', login.signOut); // 退出登录
};
