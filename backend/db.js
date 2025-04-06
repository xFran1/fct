const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos MySQL
const sequelize = new Sequelize('proyectoreact', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
