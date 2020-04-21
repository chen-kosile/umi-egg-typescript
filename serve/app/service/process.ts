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
        const { current, pageSize, userId } = params;
        const { ctx } = this;
        return await ctx.model.Process.findAndCountAll({
            where: {
                userId
            },
            include: {
                model: ctx.model.User
            },
            limit: pageSize,
            offset: current
        })
    }

    public async getApproveList(params) {
        const { current, pageSize, userId } = params;
        const { ctx } = this;
        return await ctx.model.Process.findAndCountAll({
            where: {
                approve: userId
            },
            include: {
                model: ctx.model.User
            },
            limit: pageSize,
            offset: current
        })
    }
}

module.exports = ProcessService;