import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  public async getAd() {
    const { ctx } = this;
    const data = await ctx.service.home.queryAd();
    const Ads = data.map((item: any) => {
      return item.dataValues;
    });
    ctx.returnBody(200, '获取成功', Ads);
  }
  public async getList() {
    const { ctx } = this;
    const data = await ctx.service.home.queryList();
    const list = data.map((item: any) => {
      return item.dataValues;
    });
    ctx.returnBody(200, '获取成功', list);
  }
}
