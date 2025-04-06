const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Definición del modelo de Usuario
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Asegura que el correo sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: 'usuario',  // Aquí le indicamos que apunte a la tabla 'usuario' en vez de 'Users'
    timestamps: false,  // Desactiva los campos createdAt y updatedAt

});

module.exports = User;
