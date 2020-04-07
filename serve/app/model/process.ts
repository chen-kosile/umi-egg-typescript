module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
    const Process = app.model.define('process', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
        userId: {type: STRING(255), allowNull: false},//用户id
        processType: {type: INTEGER},
        leaveType: {type: INTEGER},
        approve: {type: STRING(255)},
        reason: {type: STRING(255)},
        startTime: {type: DATE},
        endTime: {type: DATE},
        createdAt: {type: DATE, defaultValue: NOW},// 创建时间
        updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });
    return Process;
};
  