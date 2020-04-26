import { Service } from 'egg';

class RoleService extends Service {
    public async upsertRole(role) {
        const { ctx } = this;
        await ctx.model.Role.upsert(role);
    }

    public async updateRole(role) {
        return await this.ctx.model.Role.update({
            roleType: role.roleType}, {
            where: {
                userId: role.userId
            }
        });
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

    public async getRolesById(userId) {
        return this.ctx.model.Role.findAll({ 
            where: {
                superior: userId
            }
        })
    }
}

module.exports = RoleService;