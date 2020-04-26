import { Service } from 'egg';

class AnnounceService extends Service {
    public async createAnnounce(announce) {
        const { ctx } = this;
        return await ctx.model.Announce.create(announce);
    }
}

module.exports = AnnounceService;