const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./tables/User'); 
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Domicilio = require('./tables/Domicilio');
const Categoria = require('./tables/Categoria');
const Comida = require('./tables/Comida');
const session = require('express-session');



dotenv.config();
const app = express();
// app.use(cors()); // Permitir peticiones desde frontend
app.use(express.json()); // Hace que los datos viajen a través del req.body
app.use(cookieParser());


app.use(session({
  secret: 'una-clave-secreta-muy-segura',  // Cambia esto a algo seguro y privado
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,   // En desarrollo debe ser false, en producción true con HTTPS
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use(cors({
  origin: "http://localhost:5173", // o el dominio de tu frontend
  credentials: true // ¡muy importante para cookies!
}));

const ACCESS_SECRET = "maraca-gafas-2-pared-techo9-muy-largo41246&45$";
const REFRESH_SECRET = "maraca-gafas-2-pared-techo9-muy-largo41246&45$"; // Idealmente usa otra diferente


app.use((req, res, next) => {

  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return next(); // No hay tokens, el usuario sigue como no autenticado
  }

  // Si el access token existe, intentamos verificarlo
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, ACCESS_SECRET);
      req.session = req.session || {};
      req.session.user = decoded;
      return next();
    } catch (err) {
      if (err.name !== 'TokenExpiredError') {
        // Token inválido por otro motivo
        return next();
      }
    }
  }

  // Si llegamos aquí es porque el access token expiró
  if (refreshToken) {
    try {
      const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET);

      // Generamos nuevo access token
      const newAccessToken = jwt.sign(
        {
          id: decodedRefresh.id,
          username: decodedRefresh.username,
          email: decodedRefresh.email
        },
        ACCESS_SECRET,
        { expiresIn: '1h' }
      );

      // Enviamos nuevo token en cookie
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000 // 1 hora
        // maxAge: 1000 * 60 // La cookie solo tiene validez de 1 minuto

      });

      // Guardamos usuario en la sesión
      req.session = req.session || {};
      req.session.user = decodedRefresh;

    } catch (err) {
      // Refresh token inválido o expirado → no hacer nada
    }
  }

  next();
});


app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Este correo ya está registrado.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear id random (usa crypto o uuid según tu versión de Node.js)
    const id = crypto.randomUUID(); // o uuidv4()
    
    console.log('ID generado:', id);

    // Crear un nuevo usuario
    await User.create({
      id:id,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Usuario registrado exitosamente.' });

  } catch (error) {
    console.error(error.message, error.stack);
    // Solo una respuesta de error
    return res.status(500).json({ message: 'Error al registrar al usuario.' });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "Correo electrónico no registrado." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Contraseña incorrecta." });
  }

  // Le quitamos el valor de la contraseña al objeto para evitar posibles fugas

  const token = jwt.sign(
    {id: user.id,username: user.username,email: user.email}
    , "maraca-gafas-2-pared-techo9-muy-largo41246&45$",
    {
    expiresIn: '1h'
  })

  const refreshToken = jwt.sign(
    {id: user.id,username: user.username,email: user.email}
    , "maraca-gafas-2-pared-techo9-muy-largo41246&45$",
    {
    expiresIn: '30d'
  })



  // Si la comparación es exitosa, devolver un mensaje de éxito
  res
  .cookie('access_token', token, {
    httpOnly: true, // La cookie solo se puede acceder en el servidor
    secure: process.env.NODE_ENV === 'production', // Solo se envía en HTTPS en producción
    sameSite: 'strict', // Protege contra ataques CSRF
    maxAge: 1000 * 60 * 60 // La cookie solo tiene validez de 1 hora
    // maxAge: 1000 * 60 // La cookie solo tiene validez de 1 minuto
  })
  .cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Solo se envía en HTTPS en producción
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días
  })

  res.status(200).json({ message: "Login exitoso, bienvenido!" });

});

app.post("/index", async (req, res) => {
  const user = req.session?.user;
  if (!user) return;

  res.json({ user });
}); 

app.post("/profile", async (req, res) => {
  const user = req.session?.user;
  if (!user) return;
  res.json({ user });
});

app.post("/logout", async (req, res) => {
  res
     .clearCookie('access_token')
     .clearCookie('refreshToken')
     .json({ message:'Logout succesful' })
     .status(200).json({ message: "Login exitoso, bienvenido!" });
});

app.post("/insert-address", async (req,res) => {
  
  const { direccion, planta, puerta, tipo, observacion, telefono } = req.body;
  const id = crypto.randomUUID()
  const idUser = req.session?.user?.id;

  if (!idUser) {
    console.log(idUser)
    return res.status(400).json({ message: 'Usuario no autenticado.' });
  }


 
      // Crear un nuevo domicilio
  try {

    const domicilio = await Domicilio.findOne({ 
      where: { 
        idUser: idUser,
        activo: true 
      } 
    });
    
    const activo = !domicilio; // true si no existe otro activo

    // En caso de no haber ningun otro activo se activa la primera inserción.

    await Domicilio.create({
      id:id,
      idUser:idUser,
      activo:activo,
      telefono:telefono,
      tipo:tipo,
      direccion:direccion,
      planta:planta,
      puerta:puerta,
      observaciones:observacion,
   });

    res.status(201).json({ message: 'Domicilio registrado exitosamente.' });
  } catch (error) {
    console.error(error.message,error.stack);
    res.status(500).json({ message: 'Error al registrar al usuario.' });
  }
})

app.post("/get-addresses", async (req, res) => {
  try {
    const idUser = req.session?.user?.id;

    if (!idUser) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const domicilios = await Domicilio.findAll({ 
      where: { idUser },
      order: [['activo', 'DESC']] 

    });

    return res.status(200).json({ data: domicilios });

  } catch (error) {
    console.error("Error al obtener domicilios:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

app.post("/active-address", async (req, res) => {
  try {
    const idUser = req.session?.user?.id;

    if (!idUser) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const domicilio = await Domicilio.findOne({ 
      where: { 
        idUser:idUser,
        activo:true
       }
    });

    return res.status(200).json({ data: domicilio });

  } catch (error) {
    console.error("Error al obtener domicilios:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

app.post("/cambiar-address", async (req, res) => {
  
  try {
    const idUser = req.session?.user?.id;
    const { idDomicilio } = req.body;

    if (!idUser) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    await Domicilio.update(
      { activo: false },
      {
        where: {
          idUser: idUser,
          activo: true,
        },
      }
    );

     // Activar el nuevo domicilio
     await Domicilio.update(
      { activo: true },
      {
        where: {
          id: idDomicilio,
          idUser: idUser,
        },
      }
    );


    const domicilio = await Domicilio.findOne({ 
      where: { 
        idUser:idUser,
        activo:true
       }
    });




    return res.status(200).json({ data: domicilio });

  } catch (error) {
    console.error("Error al obtener domicilios:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
});

app.post("/update-unique", async (req, res) => {
  const { id,direccion, planta, puerta, tipo, observacion, telefono } = req.body;
  try {

  await Domicilio.update(
    { 
      direccion: direccion,
      planta: planta,
      puerta: puerta,
      tipo: tipo,
      observaciones: observacion,
      telefono: telefono,

     },
    {
      where: {
        id: id,
      },
    }
  );
  
  return res.sendStatus(200); 

}catch (error) {
    return res.status(500).json({ error: error });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categorias = await Categoria.findAll(); 
    return res.status(200).json( categorias );
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

app.get('/comida', async (req, res) => {
  try {
    const comidas = await Comida.findAll(); 
    return res.status(200).json( comidas );
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener categorías' });
  }
});
app.post('/addProduct', async (req, res) => {
  try {
  
  const { id } = req.body;
  
  const comida = await Comida.findOne({ where: { id:id } });

     if (!comida) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

  // Inicializar carrito si no existe
    if (!req.session.cart) {
      req.session.cart = [];
    }

  // Buscar si ya está en el carrito
    const index = req.session.cart.findIndex(item => item.id === comida.id);

    if (index !== -1) {
      // Ya existe → aumentar cantidad
      req.session.cart[index].cantidad += 1;
    } else {
      // No existe → añadir al carrito con cantidad 1
      req.session.cart.push({
        id: comida.id,
        nombre_es: comida.nombre_es,
        nombre_en: comida.nombre_en,
        img: comida.img,
        precio: comida.precio,
        cantidad: 1
      });
    }

    return res.status(200).json( req.session.cart );
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
