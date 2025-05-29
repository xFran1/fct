const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Categoria = sequelize.define('Categoria', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  nombre_es: { type: DataTypes.STRING, allowNull: true }, // español
  nombre_en: { type: DataTypes.STRING, allowNull: true },  // inglés
  
  

}, {
    tableName: 'categoria',  
    timestamps: true,  // Desactiva los campos createdAt y updatedAt

});

module.exports = Categoria;
