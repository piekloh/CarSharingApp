const {DataTypes} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  const Opinions = sequelize.define("Opinions", {
    opinionBody:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Opinions;
}