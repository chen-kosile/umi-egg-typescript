// authorization授权 中间件
module.exports = (options, app) => {
  return async (ctx, next) => {
    // 在授权配置白名单内， 跳过检验
    if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
      // 执行下一个中间件
      await next(options);
      return;
    }

    // 不在授权名单中，检验cookie 是不是登录过的
    if (ctx.cookies.get('token')) {
      const token = ctx.cookies.get('token');
      // 解码token
      try {
        ctx.jwt.verify(token, app.config.jwtSecret);
      } catch (error) {
        ctx.returnBody(401, '您未登录，请登录后再试');
        return;
      }
      await next(options);
    } else {
      ctx.returnBody(401, '您未登录， 请登录后再试');
      return;
    }
  };
};
