import { Controller} from 'egg';
const ejs = require('ejs'); //ejs模版引擎
const fs  = require('fs'); //文件读写
const path = require('path'); //路径配置

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
            useEmail,
            userId
        });
        const roles = await ctx.service.role.getRolesById(userId);
        if (useEmail === '1') {
            const ids = roles.map(item => item.userId);
            const users = await ctx.service.user.getUsersByIds(ids);
            const emils = users.map(item => item.email).join(',');
            const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, '../public/email.ejs'), 'utf8'));
            const html = template({
                title,
                content
            });
            ctx.service.tool.sendMail(emils, '公告', '公告', html);
        }
        const relations = roles.map(item => ({
            userId: item.userId,
            announceId: annonce.id,
            isRead: false,
        }));
        const res = await ctx.service.relation.bulkCreateRelations(relations);
        if (res) {
            ctx.returnBody(200, '发布成功')
        } else {
            ctx.returnBody(500, '请求失败')
        }
    }

    public async getAnnounces() {
        const { ctx } = this;
        const { userId  } = ctx.request.body;
        const results = await ctx.service.relation.getRelations(userId);
        if (results) {
            ctx.returnBody(200, '获取成功', {
                notices: results
            })
        }
    }
}

module.exports = AnnounceController;