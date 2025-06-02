const sequelize = require('./db');
const Domicilio = require('./tables/Domicilio'); 
const User = require('./tables/User'); 
const Comida = require('./tables/Comida'); 
const Categoria = require('./tables/Categoria'); 
const VentasSingulares = require('./tables/VentasSingulares')
const VentasTotales = require('./tables/VentasTotales')

// Sincroniza los modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('¡Base de datos y tablas sincronizadas!');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });