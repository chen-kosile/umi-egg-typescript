import { Service } from 'egg';
import { EmailCode } from './type/email';

class EmailService extends Service {

    public async upsertEmail(params: EmailCode) {
        const { ctx } = this;
        return ctx.model.Email.upsert(params);
    }

    /**
     * 根据邮箱，查找用户
     * @param params: EmailCode 
     * @return {Promise[EmailCode]} 承载用户的 Promise 对象
     */
    public async getByMail(email: string) {
        const { ctx } = this;
        return ctx.model.Email.findOne({ 
            where: {
                email
            }
        })
    }
}

module.exports = EmailService