module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
    const Announce = app.model.define('announces', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},//id
        userId: {type: STRING(255), allowNull: false},//用户id
        title: {type: STRING(255)}, // 权限名
        head: {type: STRING(255)}, // 权限描述
        content: {type: STRING(255)}, // 权限等级
        noticeAll: {type: INTEGER},
        useEmail: {type: INTEGER},
        status: {type: INTEGER}, // 
        createdAt: {type: DATE, defaultValue: NOW},// 创建时间
        updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });

    Announce.sync({ alter: false})
    return Announce;
};
  