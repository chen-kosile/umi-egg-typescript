import { Service } from 'egg';

// interface Ad {
//   title: string;
//   img: string;
//   link: string;
// }

export default class Home extends Service {
  // /**
  //  * @interface Ad // 广告
  //  * @param title // 标题
  //  * @param img // 图片链接
  //  * @param link // 内容地址
  //  */
  public async queryAd() {
    const { ctx } = this;
    return await ctx.model.HomeAd.findAll();
  }
  public async queryList() {
    const { ctx } = this;
    return await ctx.model.HomeList.findAll();
  }
}
