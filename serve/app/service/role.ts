import { Service } from 'egg';

class RoleService extends Service {
    public async upsertRole(role) {
        const { ctx } = this;
        await ctx.model.Role.upsert(role);
    }

    public async getRoleByUserId(userId) {
        const { ctx } = this;
        return await ctx.model.Role.findOne({
            where: {
                userId
            }
        })
    }

    public async getTearchList() {
        const { ctx } = this;
        return await ctx.model.Role.findAll({
            where: {
                roleType: 'faculty'
            }
        })
    }
}

module.exports = RoleService;