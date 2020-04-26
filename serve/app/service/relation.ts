import { Service } from 'egg';

class RelationService extends Service {
    public async bulkCreateRelations(relations) {
        const { ctx } = this;
        return await ctx.model.Relation.bulkCreate(relations);
    }

    public async getRelations(userId) {
        const { ctx } = this;
        return ctx.model.Relation.findAll({
            where: {
                userId
            },
            include: {
                model: ctx.model.Announce
            },
        })
    }
}

module.exports = RelationService;