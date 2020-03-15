import { Controller } from 'egg'

class ValidateController extends Controller {
    public async getCaptcha() {
        const { ctx } = this;
        const { email, name } = ctx.request.body;
        // console.log(ctx.cookies)
        const subject = 'OA系统邮件验证码';
        const text = '这是一封测试邮件';
        const captcha = parseInt(Math.random().toString().slice(-6));
        const html = `<h4>hi ${name} 欢迎注册</h4><div>您的验证码为：${captcha}</div>`;
        const  user = await ctx.service.user.getUserByMail(email);
        if (user) {
            ctx.returnBody(500, "邮箱已经被注册");
            return;
        } else {
            await ctx.service.email.upsertEmail({email, captcha});
            this.service.tool.sendMail(email, subject, text, html);
            ctx.returnBody(200, "发送成功");
        }
    }
}

module.exports = ValidateController;