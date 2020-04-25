import { Controller} from 'egg';

class AnnounceController extends Controller {
    public async releaseAnnounce() {
        const { ctx } = this;
        const { 
            content, 
            title, 
            noticeAll, 
            useEmail, 
            userId
            // announceUsers 
        } = ctx.request.body;
        const annonce = await ctx.service.announce.createAnnounce({
            content,
            title,
            noticeAll,
            useEmail
        });
        const users = await ctx.service.role.getUsersById(userId);
        const relations = users.map(item => ({
            userId: item.userId,
            announceId: annonce.id,
            isRead: false,
        }));
        const res = await ctx.service.relation.bulkCreateRelations({
            relations
        });
        if (res) {
            ctx.returnBody(200, '发布成功')
        } else {
            ctx.returnBody(500, '请求失败')
        }
    }

}

module.exports = AnnounceController;