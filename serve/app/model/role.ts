module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
    const Role = app.model.define('roles', {
        roleId: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
        userId: {type: STRING(255), allowNull: false},//用户id
        roleName: {type: STRING(256)}, // 角色名
        roleDes: {type: STRING(256)}, // 角色描述
        level: {type: INTEGER}, // 权限等级
        createdAt: {type: DATE, defaultValue: NOW},// 创建时间
        updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });
    return Role;
  };
  