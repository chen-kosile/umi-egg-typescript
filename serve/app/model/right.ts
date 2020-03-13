module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
    const Right = app.model.define('rights', {
        roleId: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
        userId: {type: INTEGER, allowNull: false},//用户id
        roleName: {type: STRING(256)}, // 角色名
        roleDes: {type: STRING(256)}, // 角色描述
        created_at: {type: DATE, defaultValue: NOW},// 创建时间
        updated_at: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });
    return Right;
  };
  