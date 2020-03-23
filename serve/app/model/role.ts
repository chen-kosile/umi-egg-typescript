module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
    const Role = app.model.define('roles', {
      roleId: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
      userId: {type: STRING(255), allowNull: false, unique: true},//用户id
      roleType: {type: STRING(255)}, // 角色类型 0 ，管理员 1 教职工， 2学生, -1 未知
      roleDes: {type: STRING(256)}, // 角色描述
      parentGroup: {type: STRING(256)}, // 所属组织
      superior: {type: STRING(256)}, // 领导人 username
      level: {type: INTEGER}, // 权限等级 管理员 0 ， 老师： 讲师  2，教授 1， 学生：本科 4，研究生 3
      createdAt: {type: DATE, defaultValue: NOW},// 创建时间
      updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });
    return Role;
  };
  