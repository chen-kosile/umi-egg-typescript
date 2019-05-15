import { IPlugin } from 'umi-types';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
      },
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true
      },
      // dynamicImport: {
      // },
      dll: {
        exclude: [],
        include: [
          'dva',
          'dva/router',
          'dva/saga'
        ]
      }
    }
  ]
]

export default plugins;