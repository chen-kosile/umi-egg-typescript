const jwt = require('jsonwebtoken');

module.exports = {
  get jwt() {
    return jwt;
  },
  get user() {
    const token = this.cookies.get('token');
    const user = jwt.verify(token, this.app.config.jwtSecret);
    return user;
  },
  /**
   * 返回客户端内容
   * @param status // 返回状态
   * @param message // 返回内容
   * @param data // 返回数据
   */
  returnBody (status, message, data) {
    this.status = status;
    this.body = {
      data,
      message,
      success: true,
    };
  },
};
