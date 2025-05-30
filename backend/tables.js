const sequelize = require('./db');
const Domicilio = require('./tables/Domicilio'); // Asegúrate de que la ruta sea correcta
const User = require('./tables/User'); // Asegúrate de que la ruta sea correcta
const Comida = require('./tables/Comida'); // Asegúrate de que la ruta sea correcta
const Categoria = require('./tables/Categoria'); // Asegúrate de que la ruta sea correcta

// Sincroniza los modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('¡Base de datos y tablas sincronizadas!');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });