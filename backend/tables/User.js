const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Definición del modelo de Usuario
const User = sequelize.define('User', {
  id:{
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  rol:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Asegura que el correo sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
    tableName: 'usuario',  // Aquí le indicamos que apunte a la tabla 'usuario' en vez de 'Users'
    timestamps: true,  // Desactiva los campos createdAt y updatedAt

});

module.exports = User;
