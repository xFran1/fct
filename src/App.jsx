import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Asegúrate de importar Navigate
import SignUp from './SignUp';  // Tu componente de registro
import Login from './Login';    // Tu componente de login
import Logout from './Logout';
import Index from './Index';
import Profile from './Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirige automáticamente a SignUp cuando se acceda a la raíz */}
        <Route path="/" element={<Index />} /> 
        
        {/* Ruta para Sign Up */}
        <Route path="/signup" element={<SignUp />} />

        {/* Ruta para Login */}
        <Route path="/login" element={<Login />} />
      
        {/* Ruta para protected */}
        <Route path="/index" element={<Index />} />

        {/* Ruta para desloguearse */}
        <Route path="/logout" element={<Logout />} />
        
        {/* Ruta para protected */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
