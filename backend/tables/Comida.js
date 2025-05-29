const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Definición del modelo de Usuario
  // Casa tiene Planta Puerta
  // Apartamento PlantaO PuertaO Nombre del edificio
  // Oficina Planta Puerta Nombre del edificioO
  // Otro 
  // Instrucciones para el repartidor
const Comida = sequelize.define('Comida', {
  id:{
  type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categoria',
      key: 'id',
    },
  },
  nombre_es:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
  },
  nombre_en:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false,
  },
  descripcion_es:{ 
    type: DataTypes.STRING,
    allowNull: true,
  },
  descripcion_en:{ 
    type: DataTypes.STRING,
    allowNull: true,
  }
  ,
  precio:{ 
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  img:{ 
    type: DataTypes.STRING,
    allowNull: true,
  },
  

}, {
    tableName: 'comida',  
    timestamps: true,  // Desactiva los campos createdAt y updatedAt

});

module.exports = Comida;
