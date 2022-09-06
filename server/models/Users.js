const {DataTypes} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define("Users", {
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
  })

  Users.associate = (models) => {
    Users.hasMany(models.Reservations, {
      onDelete: "cascade",
    })
  }

  return Users;
}