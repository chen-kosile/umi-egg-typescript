import { Controller } from 'egg'

class UserController extends Controller {
    /**
     * H5 注册/登录/找回密码
     * @return {Promise<*>}
     */

    // 注册
    public async register () {
        const {ctx} = this;
        const {
            password, username, email, 
            mobile, captcha, name
        } = ctx.request.body

        // 错误处理
        if (!this.__errNotice) return

        const emailCode = await ctx.service.email.getByMail(email);
        if (parseInt(captcha) === (emailCode && emailCode.captcha)) {
            // 注册成功返回体
            const user = await ctx.service.user.register({ password, username, email, mobile, name});
            if (user && user.userId) {
                await ctx.service.role.upsertRole({userId: user.userId})
            }
        } else {
            ctx.returnBody(500, '验证码错误');
        }

    }

    // 登录
    public async loginIn () {
        const {ctx} = this;
        const {password, username} = ctx.request.body

        // 登录
        const token = await ctx.service.user.login({password, username})

        // set cookie
        if (token) {
            // id存入Cookie, 用于验证过期.
            const opts = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                // maxAge: 1000 * 40,
                // signed: true,
                httpOnly: false,
                domain: '127.0.0.1'
            };
            ctx.cookies.set(this.config.auth_cookie_name, token, opts); // cookie 有效期30天
            ctx.returnBody(200, "登录成功")
        } else {
            ctx.throw(400, '用户名或密码错误')
        }
    }

    // 退出登录
    public async signOut () {
        const { ctx } = this;
        ctx.logout();
        ctx.cookies.set(this.config.auth_cookie_name, ""); // cookie 有效期30天
        ctx.returnBody(200, "退出登录成功")
    }

    // 参数异常函数
    private __errNotice () {
        const {ctx} = this;
        const {mobile, password, code, username, email} = ctx.request.body
        // 参数校验
        let message;
        if (!mobile || !email) {
            message = '手机号或者邮箱不能为空'
        } else if (!code) {
            message = '验证码不能为空'
        } else if (!username) {
            message = '用户名为空'
        } else if (!password) {
            message = '密码不能为空'
        }

        // 抛出异常
        if (message) {
            ctx.throw(400, message);
            return false
        }
        return true
    }

}

module.exports = UserController
