const sequelize = require('../db'); 
const Categoria = require('../tables/Categoria'); 

async function insertarCategorias() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Sincroniza el modelo si es necesario (opcional)
    // await sequelize.sync({ force: true }); // ⚠️ Elimina todas las tablas y las recrea

   const categorias = [
  { nombre_es: 'Hamburguesas Clásicas', nombre_en: 'Classic Burgers' },
  { nombre_es: 'Hamburguesas Especiales', nombre_en: 'Special Burgers' },
  { nombre_es: 'Papas Fritas', nombre_en: 'French Fries' },
  { nombre_es: 'Bebidas', nombre_en: 'Drinks' },
  { nombre_es: 'Complementos', nombre_en: 'Complements' },
  { nombre_es: 'Salsas y Aderezos', nombre_en: 'Sauces and Dressings' },
  { nombre_es: 'Postres', nombre_en: 'Desserts' },
];


    for (const cat of categorias) {
      await Categoria.create(cat);
    }

    console.log('Categorías insertadas correctamente.');
    process.exit();
  } catch (error) {
    console.error('Error al insertar categorías:', error);
    process.exit(1);
  }
}

insertarCategorias();