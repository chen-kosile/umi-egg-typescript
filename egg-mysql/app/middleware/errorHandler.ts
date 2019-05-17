// 错误处理中间件
module.exports = (option, app) => {
  return async (ctx, next) => {
    try {
      await next(option);
    } catch (err) {
      // 所有的异常都在app上触发一个error时间，框架会记录一条错误日志
      app.emit('error', err);
      const status = err.status || 500;

      // 生成环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error_msg = status === 500 && app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message;

      // 从error对象读出各个属性， 设置到响应中
      ctx.body = {
        data: {},
        message: error_msg,
        success: false,
      };
      ctx.status = status;
    }
  };
};
