import { EggAppConfig, PowerPartial } from 'egg';
// const moment = require('moment');

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'oasystem',
    username: 'root',
    password: '123456',
    define: {
      underscored: false
    },
    dialectOptions: {
      typeCast: function (field, next) {
        if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
          return new Date(field.string() + 'Z');
          // return moment(new Date(field.string())).format('YYYY:MM:DD HH:mm:ss');
        }
        return next();
      }
    },
    timezone: '+08:00'
  };
  return config;
};
