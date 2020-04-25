import { Service } from 'egg';

class AnnounceService extends Service {
    public async createAnnounce(process) {
        const { ctx } = this;
        return await ctx.model.Announce.create(process);
    }
}

module.exports = AnnounceService;