import { Application, Router } from 'egg';

export default (app: Application) => {
  const { controller } = app;
  const { home, login } = controller;
  const apiV2Router: Router = app.router.namespace('/api/v2');
  // api 版本的 访问路径前面加上apiV2Router的路径

  apiV2Router.get('/', home.index);
  apiV2Router.get('/homead', home.getAd); // 获取广告数据
  apiV2Router.get('/homelist/:city/:page', home.getList); // 获取商户列表数据

  apiV2Router.post('/login/register', login.register); // 注册
  apiV2Router.post('/login', login.loginIn); // 登录
  apiV2Router.get('/login/signout', login.signOut); // 退出登录
};
