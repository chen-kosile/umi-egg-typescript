module.exports = app => {
  const { STRING, INTEGER, NOW, DATE } = app.Sequelize;

  const HomeAd = app.model.define('homead', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { // 标题
      type: STRING(255),
      allowNull: false,
    },
    img: {
      type: STRING(255),
      allowNull: false,
    },
    link: {
      type: STRING(255),
      allowNull: false,
    },
    created_at: { type: DATE, defaultValue: NOW }, // 创建时间
    updated_at: { type: DATE, defaultValue: NOW }, // 更新时间
  }, {
    freezeTableName: true,
  });

  return HomeAd;
};
