module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const User = app.model.define('users', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
    userId: {type: STRING(255), allowNull: false, unique: true},//用户id
    username: {type: STRING(255), allowNull: false, unique: true}, // 用户名
    name: {type: STRING(255), allowNull: false},
    email: {type: STRING(255), allowNull: false, unique: true},// email 地址
    password: {type: STRING(255), allowNull: false},// 密码  
    captcha: {type: INTEGER}, // 校验码
    avatarUrl: {type: STRING(255), defaultValue: 'https://s11.mogucdn.com/mlcdn/c45406/181105_60bdj928jdhjg9ehhg58hje1212ek_640x640.jpg'},// 头像
    signature: {type:STRING(255)},
    title: {type: STRING(255)}, // 头衔
    notifyCount: {type: INTEGER, defaultValue: 0},
    unreadCount: {type: INTEGER, defaultValue: 0},
    mobile: STRING(32),// 手机号,
    abstract:  {type: STRING(255), allowNull: true},// 自我介绍
    sex: {type: STRING(2), defaultValue: '男'}, // 值为1时是男性，值为2时是女性，默认值为0时是未知
    createdAt: {type: DATE, defaultValue: NOW},// 创建时间
    updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
  }, {
    freezeTableName: true, // 不自动添加负数
  });

  User.sync({ alter: false})
  User.associate = function (){
    // 与Info存在一对多关系，所以是hasOne()
    // app.model.User.hasMany(app.model.Process, { foreignKey: 'userId'});
    // // 与Classes存在多对一关系，所以使用belongsTo()
    // app.model.User.belongsTo(app.model.Classes, {foreignKey: 'classId', targetKey: 'id'});
    // 与Lessison存在多对多关系，使用belongsToMany()
    // app.model.User.belongsToMany(app.model.Lession, {
    //     through: app.model.LessionStudent,
    //     foreignKey: 'studentId',
    //     otherKey: 'lessionId'
    // });
  }
  return User;
};
