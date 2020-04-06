import { Service } from 'egg';

class ProcessService extends Service {
    public async createProcess(process) {
        const { ctx } = this;
        await ctx.model.Process.create(process);
    }

    public async getRoleByUserId(userId) {
        const { ctx } = this;
        return await ctx.model.Process.findOne({
            where: {
                userId
            }
        })
    }
}

module.exports = ProcessService;