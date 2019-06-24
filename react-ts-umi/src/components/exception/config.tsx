interface IConfig {
  [key: number]: {
    img: string;
    title: string;
    desc: string;
  }
}

const config: IConfig = {
  403: {
    img: '403.png',
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: '404.png',
    title: '404',
    desc: '抱歉，你访问的页面不存在'
  },
  500: {
    img: '500.png',
    title: '500',
    desc: '抱歉，服务器出错'
  }
}

export default config;
