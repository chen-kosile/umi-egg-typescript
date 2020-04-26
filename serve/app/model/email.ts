module.exports = app => {
    const { STRING, INTEGER, DATE, NOW, BOOLEAN } = app.Sequelize;
  
    const Email = app.model.define('emailcodes', {
        emailId: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
        email: {type: STRING(255), unique: true}, // 邮件
        captcha: {type: INTEGER}, // 校验码
        isRegister: {type: BOOLEAN, defaultValue: false} , // 是否被注册
        createdAt: {type: DATE, defaultValue: NOW},// 创建时间
        updatedAt: {type: DATE, defaultValue: NOW}// 更新时间
    }, {
      freezeTableName: true, // 不自动添加负数
    });
    
    Email.sync({ alter: false})
    return Email;
};
  