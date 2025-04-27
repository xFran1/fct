const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Definición del modelo de Usuario
  // Casa tiene Planta Puerta
  // Apartamento PlantaO PuertaO Nombre del edificio
  // Oficina Planta Puerta Nombre del edificioO
  // Otro 
  // Instrucciones para el repartidor
const Domicilio = sequelize.define('Domicilio', {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Asegura que el id sea único
    primaryKey: true,
  },
  idUser:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tipo:{ // Casa, Apartamento, Oficina, Otro
    type: DataTypes.STRING,
    allowNull: true,
  },
  planta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  puerta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre_edificio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
    tableName: 'domicilio',  // Aquí le indicamos que apunte a la tabla 'usuario' en vez de 'Users'
    timestamps: true,  // Desactiva los campos createdAt y updatedAt

});

module.exports = Domicilio;
