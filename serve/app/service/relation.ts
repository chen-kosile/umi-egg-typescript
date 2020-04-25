import { Service } from 'egg';

class RelationService extends Service {
    public async bulkCreateRelations(process) {
        const { ctx } = this;
        return await ctx.model.Relation.bulkCreate(process);
    }
}

module.exports = RelationService;