const {DataTypes} = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  const Cars = sequelize.define("Cars", {
    brand:{
      type: DataTypes.STRING,
      allowNull: false
    },
    model:{
      type: DataTypes.STRING,
      allowNull: false
    },
    passengers:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doors:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gearbox:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    size:{
      type: DataTypes.STRING,
      allowNull: false
    },
    available:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
    }
  })



  Cars.associate = (models) => {
    Cars.hasMany(models.Opinions, {
      onDelete: "cascade",
    })
  }

  return Cars;
}