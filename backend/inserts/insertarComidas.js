const sequelize = require("../db");
const Comida = require("../tables/Comida");

async function insertarComidas() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");

    // Sincroniza el modelo si es necesario (opcional)
    // await sequelize.sync({ force: true }); // Elimina todas las tablas y las recrea
    // await sequelize.truncate(); // Elimina el contenido de las tablas
    await Comida.destroy({ where: {}, truncate: true }); // Elimina el contenido de la tabla

    const comidas = [
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa sencilla",
        nombre_en: "Simple Burger",
        descripcion_es: "Hamburguesa con carne, lechuga, tomate y queso.",
        descripcion_en: "Burger with meat, lettuce, tomato, and cheese.",
        precio: 5.99,
        img: "hamburguesa1.webp",
      },
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa con queso",
        nombre_en: "Cheeseburger",
        descripcion_es: "Hamburguesa con queso cheddar, lechuga y tomate.",
        descripcion_en: "Burger with cheddar cheese, lettuce, and tomato.",
        precio: 6.49,
        img: "hamburguesa2.webp",
      },
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa doble carne",
        nombre_en: "Double Patty Burger",
        descripcion_es: "Hamburguesa con dos carnes, queso y vegetales.",
        descripcion_en: "Burger with two patties, cheese, and vegetables.",
        precio: 7.99,
        img: "hamburguesa3.webp",
      },
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa con tocino",
        nombre_en: "Bacon Burger",
        descripcion_es: "Hamburguesa con tocino crujiente y queso.",
        descripcion_en: "Burger with crispy bacon and cheese.",
        precio: 7.49,
        img: "hamburguesa4.webp",
      },
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa BBQ",
        nombre_en: "BBQ Burger",
        descripcion_es:
          "Hamburguesa con salsa barbacoa, cebolla caramelizada y queso.",
        descripcion_en:
          "Burger with BBQ sauce, caramelized onions, and cheese.",
        precio: 7.99,
        img: "hamburguesa5.webp",
      },
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa vegetariana",
        nombre_en: "Veggie Burger",
        descripcion_es:
          "Hamburguesa con hamburguesa vegetal, lechuga y tomate.",
        descripcion_en: "Burger with veggie patty, lettuce, and tomato.",
        precio: 6.99,
        img: "hamburguesa6.webp",
      },
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa con huevo",
        nombre_en: "Egg Burger",
        descripcion_es: "Hamburguesa con huevo frito, queso y vegetales.",
        descripcion_en: "Burger with fried egg, cheese, and vegetables.",
        precio: 7.49,
        img: "hamburguesa7.webp",
      },
      {
        categoria_id: 1,
        nombre_es: "Hamburguesa especial",
        nombre_en: "Special Burger",
        descripcion_es:
          "Hamburguesa con ingredientes especiales y salsa secreta.",
        descripcion_en: "Burger with special ingredients and secret sauce.",
        precio: 8.49,
        img: "hamburguesa8.webp",
      },
      {
        categoria_id: 2,
        nombre_es: "Patatas fritas clásicas",
        nombre_en: "Classic French Fries",
        descripcion_es: "Papas fritas crujientes y saladas.",
        descripcion_en: "Crispy salted French fries.",
        precio: 2.99,
        img: "patatas1.webp",
      },
      {
        categoria_id: 2,
        nombre_es: "Papas fritas con queso",
        nombre_en: "Cheese Fries",
        descripcion_es: "Papas fritas cubiertas con queso derretido.",
        descripcion_en: "Fries topped with melted cheese.",
        precio: 3.99,
        img: "patatas2.webp",
      },
      {
        categoria_id: 2,
        nombre_es: "Papas fritas con tocino",
        nombre_en: "Bacon Fries",
        descripcion_es: "Papas fritas con trozos de tocino crujiente y queso.",
        descripcion_en: "Fries with crispy bacon bits and cheese.",
        precio: 4.49,
        img: "patatas3.webp",
      },
      {
        categoria_id: 2,
        nombre_es: "Papas gajo",
        nombre_en: "Potato Wedges",
        descripcion_es: "Papas cortadas en gajos, crujientes y sazonadas.",
        descripcion_en: "Crispy seasoned potato wedges.",
        precio: 3.49,
        img: "patatas4.webp",
      },
      {
        categoria_id: 2,
        nombre_es: "Papas fritas con chile y limón",
        nombre_en: "Chili Lime Fries",
        descripcion_es: "Papas fritas con toque de chile y limón.",
        descripcion_en: "Fries with chili and lime seasoning.",
        precio: 3.99,
        img: "patatas5.webp",
      },
      {
        categoria_id: 2,
        nombre_es: "Papas fritas con ajo y perejil",
        nombre_en: "Garlic & Parsley Fries",
        descripcion_es: "Papas fritas sazonadas con ajo y perejil fresco.",
        descripcion_en: "Fries seasoned with garlic and fresh parsley.",
        precio: 3.99,
        img: "patatas6.webp",
      },
      {
        categoria_id: 2,
        nombre_es: "Papas trufadas",
        nombre_en: "Truffle Fries",
        descripcion_es: "Papas fritas con aceite de trufa y parmesano.",
        descripcion_en: "Fries with truffle oil and parmesan cheese.",
        precio: 5.49,
        img: "patatas7.webp",
      },
      {
        categoria_id: 3,
        nombre_es: "Refresco cola",
        nombre_en: "Cola Soda",
        descripcion_es: "Bebida gaseosa sabor cola.",
        descripcion_en: "Carbonated cola-flavored drink.",
        precio: 1.99,
        img: "refresco1.webp",
      },
      {
        categoria_id: 3,
        nombre_es: "Agua mineral",
        nombre_en: "Mineral Water",
        descripcion_es: "Agua sin gas, embotellada.",
        descripcion_en: "Still bottled water.",
        precio: 1.49,
        img: "refresco2.webp",
      },
      {
        categoria_id: 3,
        nombre_es: "Limonada natural",
        nombre_en: "Fresh Lemonade",
        descripcion_es: "Limonada fresca hecha con limón natural.",
        descripcion_en: "Fresh lemonade made with natural lemons.",
        precio: 2.49,
        img: "refresco3.webp",
      },
      {
        categoria_id: 3,
        nombre_es: "Té helado",
        nombre_en: "Iced Tea",
        descripcion_es: "Té frío endulzado con limón.",
        descripcion_en: "Cold tea sweetened with lemon.",
        precio: 2.29,
        img: "refresco4.webp",
      },
      {
        categoria_id: 3,
        nombre_es: "Jugo de naranja",
        nombre_en: "Orange Juice",
        descripcion_es: "Jugo natural de naranja recién exprimido.",
        descripcion_en: "Freshly squeezed natural orange juice.",
        precio: 2.99,
        img: "refresco5.webp",
      },
      {
        categoria_id: 3,
        nombre_es: "Cerveza artesanal",
        nombre_en: "Craft Beer",
        descripcion_es: "Cerveza artesanal local.",
        descripcion_en: "Local craft beer.",
        precio: 4.99,
        img: "refresco6.webp",
      },
      {
        categoria_id: 4,
        nombre_es: "Aros de cebolla",
        nombre_en: "Onion Rings",
        descripcion_es: "Aros de cebolla crujientes y dorados.",
        descripcion_en: "Crispy golden onion rings.",
        precio: 3.49,
        img: "complementos1.webp",
      },
      {
        categoria_id: 4,
        nombre_es: "Ensalada pequeña",
        nombre_en: "Small Salad",
        descripcion_es: "Ensalada fresca con lechuga, tomate y zanahoria.",
        descripcion_en: "Fresh salad with lettuce, tomato, and carrot.",
        precio: 3.99,
        img: "complementos2.webp",
      },
      {
        categoria_id: 4,
        nombre_es: "Palitos de mozzarella",
        nombre_en: "Mozzarella Sticks",
        descripcion_es: "Palitos de queso mozzarella empanizados y fritos.",
        descripcion_en: "Breaded and fried mozzarella cheese sticks.",
        precio: 4.29,
        img: "complementos3.webp",
      },
      {
        categoria_id: 4,
        nombre_es: "Guacamole",
        nombre_en: "Guacamole",
        descripcion_es: "Dip cremoso de aguacate con tomate y cebolla.",
        descripcion_en: "Creamy avocado dip with tomato and onion.",
        precio: 3.99,
        img: "complementos4.webp",
      },
      {
      categoria_id: 4,
      nombre_es: "Pan de ajo",
      nombre_en: "Garlic Bread",
      descripcion_es: "Crujiente pan tostado con mantequilla de ajo y perejil.",
      descripcion_en: "Crispy toasted bread with garlic butter and parsley.",
      precio: 3.25,
      img: "complementos5.webp"
      },
      {
        categoria_id: 4,
        nombre_es: "Nachos con queso",
        nombre_en: "Cheese Nachos",
        descripcion_es: "Nachos cubiertos con queso derretido y jalapeños.",
        descripcion_en: "Nachos topped with melted cheese and jalapeños.",
        precio: 5.49,
        img: "complementos6.webp",
      },
      {
        categoria_id: 5,
        nombre_es: "Salsa BBQ",
        nombre_en: "BBQ Sauce",
        descripcion_es: "Salsa barbacoa dulce y ahumada.",
        descripcion_en: "Sweet and smoky barbecue sauce.",
        precio: 0.5,
        img: "salsa1.webp",
      },
      {
        categoria_id: 5,
        nombre_es: "Mayonesa",
        nombre_en: "Mayonnaise",
        descripcion_es: "Aderezo cremoso de mayonesa.",
        descripcion_en: "Creamy mayonnaise dressing.",
        precio: 0.5,
        img: "salsa2.webp",
      },
      {
        categoria_id: 5,
        nombre_es: "Ketchup",
        nombre_en: "Ketchup",
        descripcion_es: "Salsa de tomate clásica.",
        descripcion_en: "Classic tomato ketchup.",
        precio: 0.5,
        img: "salsa3.webp",
      },
      {
        categoria_id: 5,
        nombre_es: "Mostaza",
        nombre_en: "Mustard",
        descripcion_es: "Mostaza tradicional amarilla.",
        descripcion_en: "Traditional yellow mustard.",
        precio: 0.5,
        img: "salsa4.webp",
      },
      {
        categoria_id: 5,
        nombre_es: "Salsa de ajo",
        nombre_en: "Garlic Sauce",
        descripcion_es: "Salsa cremosa con sabor a ajo.",
        descripcion_en: "Creamy garlic-flavored sauce.",
        precio: 0.6,
        img: "salsa5.webp",
      },
      {
        categoria_id: 6,
        nombre_es: "Brownie de chocolate",
        nombre_en: "Chocolate Brownie",
        descripcion_es: "Brownie de chocolate con nueces y salsa de vainilla.",
        descripcion_en: "Chocolate brownie with nuts and vanilla sauce.",
        precio: 3.99,
        img: "postre1.webp",
      },
      {
        categoria_id: 6,
        nombre_es: "Helado de vainilla",
        nombre_en: "Vanilla Ice Cream",
        descripcion_es: "Helado cremoso de vainilla natural.",
        descripcion_en: "Creamy natural vanilla ice cream.",
        precio: 2.99,
        img: "postre2.webp",
      },
      {
        categoria_id: 6,
        nombre_es: "Tarta de manzana",
        nombre_en: "Apple Pie",
        descripcion_es: "Tarta casera de manzana con canela.",
        descripcion_en: "Homemade apple pie with cinnamon.",
        precio: 4.49,
        img: "postre3.webp",
      },
      {
        categoria_id: 6,
        nombre_es: "Cheesecake",
        nombre_en: "Cheesecake",
        descripcion_es: "Pastel de queso cremoso con base de galleta.",
        descripcion_en: "Creamy cheesecake with a cookie crust.",
        precio: 4.99,
        img: "postre4.webp",
      },
      {
        categoria_id: 6,
        nombre_es: "Mousse de chocolate",
        nombre_en: "Chocolate Mousse",
        descripcion_es: "Mousse suave y esponjosa de chocolate.",
        descripcion_en: "Soft and fluffy chocolate mousse.",
        precio: 3.79,
        img: "postre5.webp",
      },
      {
        categoria_id: 6,
        nombre_es: "Galletas caseras",
        nombre_en: "Homemade Cookies",
        descripcion_es: "Galletas recién horneadas con chispas de chocolate.",
        descripcion_en: "Freshly baked cookies with chocolate chips.",
        precio: 2.99,
        img: "postre6.webp",
      },
    ];

    for (const cat of comidas) {
      await Comida.create(cat);
    }

    console.log("Categorías insertadas correctamente.");
    process.exit();
  } catch (error) {
    console.error("Error al insertar categorías:", error);
    process.exit(1);
  }
}

insertarComidas();
