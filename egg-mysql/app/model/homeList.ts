module.exports = app => {
  const { STRING, INTEGER, NOW, DATE } = app.Sequelize;

  const HomeList = app.model.define('homelist', {
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
    subTitle: { type: STRING(255), allowNull: false },
    price: { type: INTEGER, allowNull: false },
    distance: { type: STRING(255), allowNull: false },
    number: { type: INTEGER, allowNull: false },
    created_at: { type: DATE, defaultValue: NOW }, // 创建时间
    updated_at: { type: DATE, defaultValue: NOW }, // 更新时间

  }, {
    freezeTableName: true,
  });
  return HomeList;
};
