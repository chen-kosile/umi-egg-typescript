import { Controller } from 'egg'

class UserController extends Controller {
 
    // 获取用户信息
    public async userInfo() {
        const {ctx} = this

        let userId = ctx.cookies.get('userId');
        if (!userId) {
            ctx.returnBody(403, '')
            return;
        }
        // 获取并填充数据
        let user = await this.service.user.getUserByUserId(userId);
        let role = await this.service.role.getRoleByUserId(userId);
        if (user) {
            let userInfo = {
                username: user.username,
                email: user.email,
                avatar: user.avatarUrl,
                name: user.name,
                abstract: user.abstract,
                account: user.email.replace(/@.*/, ''),
                mobile: user.mobile,
                sex: user.sex,
                userId: user.userId,
                group: role.group,
                parentGroup: role.parentGroup,
                level: role.level
            }
            ctx.returnBody(200, "获取成功", userInfo)
        } else {
            ctx.returnBody(200, "")
        }
    }

    // 更新用户信息
    public async updateUserInfo () {
        const {ctx} = this
        let userId = ctx.user.userId

        let contentBody = ctx.request.body
        
        // 更新已使用的他人邮箱地址
        if (contentBody.email) {
            let result = await this.service.user.getUserByMail(contentBody.email)
            if (result && result.userId !== userId) {
                ctx.returnBody(400, "该邮箱已被其他账户使用")
                return;
            }
        }

        // 密码校验不通过
        let result = await this.service.user.getUserByUserId(userId)
        if (contentBody.password && result && result.password !== contentBody.password) {
            ctx.returnBody(400, "旧密码不正确")
            return;
        } else if(contentBody.password) {
            contentBody.password = contentBody.newPassword
        }

        // 获取并填充数据
        await this.service.user.updateUserInfo({userId}, contentBody)

        // 已更改密码，让用户重新登录
        if (contentBody.password) {
            ctx.logout();
            ctx.cookies.set(this.config.auth_cookie_name, "");
            ctx.returnBody(401, "密码更新成功，请重新登录")
        } else {
            ctx.returnBody(200, "更新成功")
        }
    }
    // 获取所有教师
    public async teacherList() {
        const { ctx } = this;
        const roles = await ctx.service.role.getTearchList();
        const ids = roles.map(item => (item.userId));
        const users = await ctx.service.user.getUsersByIds(ids);
        if (Array.isArray(users)) {
            ctx.returnBody(200, '请求成功', { teacherList: users })
        } else {
            ctx.returnBody(500, '请求失败')
        }
    }

    // 获取用户列表
    public async teacherInfos() {
        const { ctx } = this;
        const { userId } = ctx.request.body;
        const user = await ctx.service.role.getRoleByUserId(userId);
        const teacher = await ctx.service.user.getUserByUserId(user.superior);
        const roles = await ctx.service.role.getTearchList();
        const ids = roles.map(item => (item.userId));
        const users = await ctx.service.user.getUsersByIds(ids);
        
        if (Array.isArray(users)) {
            ctx.returnBody(200, '请求成功', { teacherInfos: users, headTeacher: teacher || {} })
        } else {
            ctx.returnBody(500, '请求失败')
        }
    }

    public async completeInfo() {
        const { ctx } = this;
        const { userId, roleType, superior, parentGroup, group, level } = ctx.request.body;

        const role = await ctx.service.role.updateRole({ 
            userId,
            roleType, 
            superior: superior ? superior : 'admin',
            parentGroup,
            group,
            level
        });

        if (role) {
            ctx.returnBody(200, '保存成功')
        } else {
            ctx.returnBody(500, '请求失败')
        }
    }
}

module.exports = UserController;
