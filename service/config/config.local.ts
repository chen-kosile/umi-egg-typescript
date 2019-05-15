import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'dianping',
    username: 'root',
    password: '18279438873',
    operatorsAliases: false,
  };
  return config;
};
