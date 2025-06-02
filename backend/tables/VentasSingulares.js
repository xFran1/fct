const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Definición del modelo de Usuario
const VentasSingulares = sequelize.define('VentasSingulares', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
    idVenta:{
    type: DataTypes.UUID,
    allowNull: false
  },
  idComida:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comentarios: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
    tableName: 'ventas_singulares',  
    timestamps: true,  // Desactiva los campos createdAt y updatedAt

});

module.exports = VentasSingulares;
