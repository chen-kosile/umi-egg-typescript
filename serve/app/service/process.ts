import { Service } from 'egg';

class ProcessService extends Service {
    public async createProcess(process) {
        const { ctx } = this;
        return await ctx.model.Process.create(process);
    }

    public async getRoleByUserId(userId) {
        const { ctx } = this;
        return await ctx.model.Process.findOne({
            where: {
                userId
            }
        })
    }

    public async getLengthById(userId) {
        return await this.ctx.model.Process.findAll({
            where: {
                userId
            }
        })
    }

    public async getProcessList(params) {
        const { userId, limit, offset } = params;
        const { ctx } = this;
        return await ctx.model.Process.findAndCountAll({
            where: {
                userId
            },
            include: {
                model: ctx.model.User
            },
            limit,
            offset
        })
    }
}

module.exports = ProcessService;