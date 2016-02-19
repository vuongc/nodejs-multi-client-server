const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_dev', 'vuongc', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
};
