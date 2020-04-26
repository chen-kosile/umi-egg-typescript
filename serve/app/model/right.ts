module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
    const Right = app.model.define('rights', {
      rightId: {type: INTEGER, primaryKey: true, autoIncrement: true},//id
      userId: {type: STRING(255), allowNull: false},//用户id
      rightName: {type: STRING(255)}, // 权限名
      rightDes: {type: STRING(255)}, // 权限描述
      level: {type: INTEGER}, // 权限等级
      createdAt: {type: DATE, defaultValue: NOW},// 创建时间
      updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });

    Right.sync({ alter: false})
    return Right;
  };
  