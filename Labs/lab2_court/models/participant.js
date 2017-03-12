'use strict';
module.exports = function(sequelize, DataTypes) {
  var Participant = sequelize.define('Participant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Participant;
};