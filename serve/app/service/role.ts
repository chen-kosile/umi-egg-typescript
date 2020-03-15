import { Service } from 'egg';

class RoleService extends Service {
    public async upsertRole(role) {
        const { ctx } = this;
        await ctx.model.Role.upsert(role);
    }
}

module.exports = RoleService;