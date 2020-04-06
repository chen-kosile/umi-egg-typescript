module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Process = app.model.define('process', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
        userId: {type: STRING(255), allowNull: false, unique: true},//用户id
        processType: {type: INTEGER},
        leaveType: {type: INTEGER},
        approve: {type: STRING(255)},
        reason: {type: STRING(255)},
        startTime: {type: DATE},
        endTime: {type: DATE}
    }, {
      freezeTableName: true, // 不自动添加负数
    });
    return Process;
};
  