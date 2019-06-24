import { IConfig } from 'umi-types';
import routeConfig from './router.config';
import plugins from './plugin.config';
import serverConfig from './server.config';
import themeConfig from './theme.config';

// const { NODE_ENV } = process.env;
const NODE_ENV = 'development';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  plugins,
  // 约定式路由
  // routes: {
  //   exclude: [
  //     /models\//,
  //     /components\//,
  //     /services\//,
  //     /model\.(t|j)sx?$/,
  //   ],
  // },
  // 配置式路由， 
  routes: routeConfig,
  define: {
    // NODE_ENV: 'development',
    BASE_URL: serverConfig[NODE_ENV] || serverConfig.development
  },
  theme: themeConfig,
  hash: true,
}

export default config;
