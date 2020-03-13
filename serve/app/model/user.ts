module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const User = app.model.define('users', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
    userId: {type: INTEGER},//用户id
    username: {type: STRING(255), allowNull: false}, // 用户名 校园卡号
    email: {type: STRING(255), allowNull: false},// email 地址
    password: {type: STRING(255), allowNull: false},// 密码  
    avatarUrl: {type: STRING(256), defaultValue: 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg'},// 头像
    signature: {type:STRING(256)}, // 签名
    title: {type: STRING(256)}, // 头衔、管理员， 教职工，学生
    group: {type: STRING(256)}, // 所属组织
    notifyCount: {type: INTEGER, defaultValue: 0}, // 提醒数量
    unreadCount: {type: INTEGER, defaultValue: 0}, // 未读数量
    mobile: STRING(32),// 手机号,
    prefix: STRING(32),// 手机号,
    abstract:  {type: STRING(255)},// 自我介绍
    sex: {type: STRING(2), defaultValue: '男'}, // 值为1时是男性，值为2时是女性，默认值为0时是未知
    created_at: {type: DATE, defaultValue: NOW},// 创建时间
    updated_at: {type: DATE, defaultValue: NOW}// 更新时间
  }, {
    freezeTableName: true, // 不自动添加负数
  });
  return User;
};
