const {DataTypes} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  const Reservations = sequelize.define("Reservations", {
    start:{
      type: DataTypes.DATE,
      allowNull: false
    },
    stop:{
      type: DataTypes.DATE,
      allowNull: false
    }
  })
  
  return Reservations;
}