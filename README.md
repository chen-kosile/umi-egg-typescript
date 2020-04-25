# 用于应用学习的知识

- typescript
- umi
- egg
- echarts
- WebGL
- node
- react
- dva

    // "tslint": "^5.12.0",
    // "tslint-eslint-rules": "^5.4.0",
    // "tslint-react": "^3.6.0",

- 项目目录结构
  - serve node后端
    - app  主要后端代码
      - controller
      - extend
      - middleware
      - model
      - public
      - service
    - config  egg 配置文件
    - database 数据库配置文件 有sequelize来映射数据库
  - client react前端
    - config  react 项目配置 umi框架配置
    - dist 项目打包后的项目
    - mock 数据模拟文件 遵循umi配置
    - public
    - src 项目主要代码
      - assets 一些静态文件， 图片
      - components 公用组件
      - config 项目中有些公用数据配置文件
      - layouts 各主页面页面布局
      - models dva model数据流控制
      - pages umi约定式页面
      - services 服务文件
      - utils 工具文件 request等