import { Controller } from 'egg';

export default class LoginController extends Controller {
  /**
   * H5 注册/登录/找回密码
   * @return {Promise<*>}
   */

   // 注册
  public async register () {
    const { ctx } = this;
    const { password, username, mobile, email } = ctx.request.body;
    // 错误处理
    if (!this.__errNotice) return;
    // 注册成功
    await ctx.service.user.register({ password, username, mobile, email });
  }

  // 登录
  public async loginIn () {
    const { ctx } = this;
    const { password, mobile } = ctx.request.body;

    // 登录
    const token = await ctx.service.user.login({ password, mobile });

    // set cookie
    if (token) {
      // id 存入Cookie, 用于验证过期.
      const opts = {
        domain: '127.0.0.1',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 设置有效期30天
        httpOnly: false,
      };
      ctx.cookies.set(this.config.auth_cookie_name, token, opts);
      ctx.returnBody(200, '登录成功');
    } else {
      ctx.throw(400, '用户名或密码错误');
    }
  }

  // 退出登录
  public async signOut () {
    const { ctx } = this;
    ctx.logout();
    ctx.cookies.set(this.config.auth_coockie_name, '');
    ctx.returnBody(200, '退出登录成功');
  }

  // 参数异常
  private __errNotice () {
    const { ctx } = this;
    const { mobile, password, code, username, email } = ctx.request.body;
    console.log(mobile);
    // 参数校验
    let message;
    if (!mobile || !email) {
      message = '手机号或者邮箱不能为空';
    } else if (!code) {
      message = '验证码不能为空';
    } else if (!username) {
      message = '用户名为空';
    } else if (!password) {
      message = '密码不能为空';
    }
    console.log('+++++++++test');
    // 抛出异常
    if (message) {
      ctx.throw(400, message);
      return false;
    }
    return true;
  }
}
