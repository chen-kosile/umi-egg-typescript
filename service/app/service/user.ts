import { Service } from 'egg';
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const crypto = require('crypto');

/**
 * Service user
 */

interface RegisterParams {
  username: string;
  password: string;
  mobile: number;
  email?: string;
  userId?: string;
}

interface LoginParams {
  mobile: string;
  password: string;
}

export default class UserService extends Service {
  /**
   * @interface RegisterParams
   * @param username // 用户名
   * @param password // 密码
   * @param mobile // 电话号码
   */
  public async register (user: RegisterParams) {
    const { ctx, app } = this;

    // 添加uuid
    user.userId = uuid.v4().replace(/-/g, '');

    // 是否可以查询到
    const queryResult = await this.hasRegister(user.mobile);
    if (queryResult) {
      ctx.returnBody(200, '号码已被使用', {
        flag: false,
      });
      return;
    }

    // 加密保存用户秘密吗
    user.password = crypto.createHmac('sha256', app.config.password_secret)
      .update(user.password)
      .digest('hex');
    const userInfo = await this.ctx.model.User.create(user);

    // 注册成功, 返回userid给前端
    ctx.status = 200;
    ctx.returnBody(200, '注册成功', {
      userId: userInfo.dataValues.userId,
      flag: true,
    });
    return userInfo.dataValues;
  }

  /**
   * @interface LoginParams
   * @param username // 用户名
   * @param password // 密码
   */
  public async login (user: LoginParams) {
    const { app } = this;
    const existUser = await this.getUserByMobile(user.mobile);

    // 用户不存在
    if (!existUser) {
      return null;
    }

    const passhash = existUser.password;
    // 将用户登录填的密码与保存进数据库加密相同算法加密
    user.password = crypto.createHmac('sha256', app.config.password_secret)
    .update(user.password)
    .digest('hex');
    // TODO: change to async compare
    // 将用户填写的密码与保存在数据库中的密码匹配
    const equal = passhash === user.password;

    // 密码不匹配
    if (!equal) {
      return false;
    }

    //  验证通过
    const token = jwt.sign({ userId: existUser.userId }, app.config.jwtSecret, { expiresIn: '7d' });
    return token;
  }

  /**
   * @param mobile // 电话号码
   */
  private async hasRegister(mobile) {
    // 查询用户名
    const user = await this.ctx.model.User.findOne({
      where: { mobile },
    });

    if (user && user.dataValues.userId) {
      return true;
    }

    return false;
  }

  /**
   * 根据userId查找用户
   * @param {String} loginName 登录名
   * @param {Promise[user]} 承载用户的Promise对象
   */
  public async getUserByUserId(userId) {
    const query = { userId };
    return this.ctx.model.User.findOne({
      where: query,
    });
  }

  /**
   * 根据手机号码， 查找用户
   * @param {String} mobile 手机号码
   * @return {Promise[user]} 承载用户的promise对象
   */
  public async getUserByMobile(mobile) {
    return this.ctx.model.User.findOne({
      where: {
        mobile,
      },
    });
  }

  /**
   * 更新用户数据
   * @param {String} mobile 手机号码
   * @return {Promise[user]} 承载用户的Promise对象
   */
  public async updateUserInfo(query, updateValue) {

    return this.ctx.model.User.update(updateValue, {
      where: query,
    });
  }

  /**
   * 查找除自己外的用户
   * @return {Promise[user]} 承载用户的Promise对象
   */
  // public async getUserList(userId) {
  //   const { app } = this;
  //   const Op = app.Sequelize.Op;

  //   // 查询已关注用户
  //   let followList = await this.ctx.model.Follow.findAll({
  //     attributes: [ 'userId', ],
  //     where: {
  //       followedId: userId,
  //       status: 1,
  //     },
  //   });

  //   // 处理数据
  //   followList = followList.map(item => {
  //     return item.userId;
  //   });

  //   return this.ctx.model.User.findAll({
  //     attributes: [ 'userId', 'username', 'mobile', 'avatarUrl', 'abstract' ],
  //     where: {
  //       userId: {
  //         [Op.ne]: userId,
  //         [Op.notIn]: followList,
  //       },
  //     },
  //   });
  // }
}
