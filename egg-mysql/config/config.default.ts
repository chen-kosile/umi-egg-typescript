import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548162653718_4775';

  // add RESTful API base path
  config.basePath = '/api/v2';
  // add your egg config in here
  config.middleware = [];
  // 取消 csrf 防范
  config.security = {
    csrf: { enable: false },
    // 允许本地3000端口访问 这里前端部分是在3000端口打开
    domainWhiteList: [ 'http://localhost:3000', 'http://127.0.0.1:3000' ],
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  config.auth_cookie_name = 'token';
  config.routerPlus = {
    enable: true,
    package: 'egg-router-plus',
  };
  // 白名单
  config.authWhiteList = [ '/api/v2/user/login', '/api/v2/login/register', ];
  config.middleware = [ 'errorHandler', ];
  // config.middleware = [ 'authorization', 'errorHandler' ];
  config.password_secret = 'ps1234secr';
    // token 凭证
  config.jwtSecret = 'kosile';
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
