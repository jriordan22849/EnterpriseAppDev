'use strict';
module.exports = function(sequelize, DataTypes) {
  var Keys = sequelize.define('Keys', {
    apikeys: DataTypes.STRING,
    secretkeys: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Keys;
};