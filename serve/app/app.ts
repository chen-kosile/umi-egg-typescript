'use strict';
const uuid = require('uuid');

module.exports = app => {
  // 校验github用户登录信息（包括首次以及多次登录的处理）
  app.passport.verify(async (ctx, user) => {
    // user即为github提供的用户信息
    console.log('========================')
    console.log(user);
    const existsUser = await ctx.model.User.findOne({
      where: { uid: user.id },
    });
    if (existsUser) {
      const token = jwt.sign({ userId: existsUser.userId }, app.config.jwt_secret, { expiresIn: '7d' });
      await ctx.service.user.setCookie(token); // 设置登录用户cookie信息，以避开系统接口访问拦截
      return existsUser;
    }
    // 首次github登录，调用 service 注册新用户
    const newUser = await ctx.service.user.register({
      username: user.name,
      userId: uuid.v4().replace(/-/g,''),
      password: app.config.passportGithubPassword, // github登录用户统一初始化密码，在进入系统后强制修改密码
      email: user.profile._json.email,
      provider: user.provider,
      uid: user.id,
      thirdPassUpdateStatus: 0, // 0 代表为初次登录未修改过密码
      avatarUrl: user.photo,
      abstract: user.profile._json.bio,
    });
    const token = jwt.sign({ userId: newUser.userId }, app.config.jwt_secret, { expiresIn: '7d' });
    await ctx.service.user.setCookie(token);
    return newUser;
  });
};
