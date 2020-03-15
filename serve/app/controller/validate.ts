import { Controller } from 'egg'

class ValidateController extends Controller {
  async getCaptcha(email: string) {
  	const ctx = this.ctx;

    const subject = '测试邮件';
    const text = '这是一封测试邮件';
    const html = '<h2>测试一下::</h2><a class="elem-a" href="https://baidu.com"><span class="content-elem-span">测试链接</span></a>';
    
    const has_send = await this.service.tool.sendMail(email, subject, text, html);
    
    if (has_send) {
		ctx.body={
			message: '发送成功',
		};
		return;
	}
	ctx.body={
		message: '发送失败',
	};
  }

  public async validateCaptcha() {

  }

}

module.exports = ValidateController;