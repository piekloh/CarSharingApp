const {DataTypes} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  const Opinions = sequelize.define("Opinions", {
    opinionBody:{
      type: DataTypes.STRING,
      allowNull: false
    },
  })
  return Opinions;
}