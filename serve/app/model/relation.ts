module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  
    const Relation = app.model.define('relations', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},//id
        userId: {type: STRING(255), allowNull: false},//用户id
        announceId: {type: STRING(255)}, // 
        isRead: {type: STRING(255)}, // 0 未读 ，1 已读
        readDate: {type: DATE, defaultValue: NOW}, // 权限等级
        createdAt: {type: DATE, defaultValue: NOW},// 创建时间
        updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });
    Relation.associate = function () {
      app.model.Relation.belongsTo(app.model.Announce, {foreignKey: 'announceId', targetKey: 'id'});
    }
    Relation.sync({ alter: false})
    return Relation;
};
  