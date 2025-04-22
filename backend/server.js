const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./User'); 
const crypto = require('crypto');
const jwt = require('jsonwebtoken');



dotenv.config();
const app = express();
// app.use(cors()); // Permitir peticiones desde frontend
app.use(express.json()); // Hace que los datos viajen a través del req.body
app.use(cookieParser());


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


// Ruta para el registro de usuario (sign up)
app.post('/signup', async (req, res) => {


  const { username, email, password } = req.body;
  // Verificar si el correo ya está registrado
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Este correo ya está registrado.' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear id random
  const id = crypto.randomUUID()

  // Crear un nuevo usuario
  try {

    await User.create({
       id,
       username,
       email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error(error.message,error.stack);
    res.status(500).json({ message: 'Error al registrar al usuario.' });
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

app.post("/revisarIdioma", async (req, res) => {


});



app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
