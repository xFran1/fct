const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // La ruta del router

const app = express();
app.use(cors()); // Permitir peticiones desde frontend
app.use(express.json());

app.use('/api/auth', authRoutes); // Te lleva al auth.js

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
