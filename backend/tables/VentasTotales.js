const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Definición del modelo de Usuario
const VentasTotales = sequelize.define('VentasTotales', {
  id:{
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
    idUser:{
    type: DataTypes.UUID,
    allowNull: false,
  },
    idDomicilio:{
    type: DataTypes.UUID,
    allowNull: false,
  },
  
    total:{
    type: DataTypes.FLOAT,
    allowNull: false,
  },
    estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
}, {
    tableName: 'ventas_totales',  
    timestamps: true,  // Desactiva los campos createdAt y updatedAt

});

module.exports = VentasTotales;
