'use strict';
module.exports = function(sequelize, DataTypes) {
  var CourtRoom = sequelize.define('CourtRoom', {
    id: {
      type: DataTypes.INTEGER,
      default: 1,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CourtRoom;
};