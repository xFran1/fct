import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Asegúrate de importar Navigate
import SignUp from './SignUp';  // Tu componente de registro
import Login from './Login';    // Tu componente de login

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirige automáticamente a SignUp cuando se acceda a la raíz */}
        <Route path="/" element={<Navigate to="/login" />} />  {/* Cambié "/login" a "/signup" */}
        
        {/* Ruta para Sign Up */}
        <Route path="/signup" element={<SignUp />} />

        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
