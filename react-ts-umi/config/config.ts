import { IConfig } from 'umi-types';
import routeConfig from './router.config';
import plugins from './plugin.config';
import serverConfig from './server.config';
import themeConfig from './theme.config';

const { NODE_ENV } = process.env;

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
    BASE_URL: serverConfig[NODE_ENV] || serverConfig.development
  },
  theme: themeConfig,
  chainWebpack(config, { webpack }) {
    // config.merge({
    //   plugin: {
    //     bundleAnalyzer: {
    //       plugin: require("webpack-bundle-analyzer").BundleAnalyzerPlugin,
    //       args: [{ analyzerPort: 9999 }]
    //     }
    //   }
    // });
    //第二种方式添加
    /*config
      .plugin("webpack-bundle-analyzer")
      .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin, [
        { analyzerPort: 9900 }
      ]);*/
  },
  hash: true,
  proxy: {
    '/api/': {
      target: 'http://127.0.0.1:7001/',
      changeOrigin: true,
    },
  }
}

export default config;
