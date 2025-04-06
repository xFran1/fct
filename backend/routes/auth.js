const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../User');  // Asegúrate de importar el modelo User

const router = express.Router();

// Ruta para el registro de usuario (sign up)
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el correo ya está registrado
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Este correo ya está registrado.' });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear un nuevo usuario
  try {
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar al usuario.' });
  }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    console.log("Usuario encontrado:", user); // Verifica si se encuentra el usuario
    if (!user) {
      return res.status(400).json({ message: "Correo electrónico no registrado." });
    }
  
    // Comparar la contraseña ingresada con el hash almacenado
    console.log("Contraseña ingresada:", password);
    console.log("Hash almacenado:", user.password);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("¿Es válida la contraseña?", isPasswordValid);   

   
   
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }
  
    // Si la comparación es exitosa, devolver un mensaje de éxito
    res.status(200).json({ message: "Login exitoso, bienvenido!" });
  });
  
  

module.exports = router;
