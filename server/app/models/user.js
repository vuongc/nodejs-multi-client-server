'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type:DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, default: false }
  }, {
    classMethods: {
      userIsAdmin: function() {
        return this.getDataValue('isAdmin');
      }
    }
  });

  return User;
};
