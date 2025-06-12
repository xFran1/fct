import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Asegúrate de importar Navigate
import SignUp from './SignUp';  // Tu componente de registro
import Login from './Login';    // Tu componente de login
import Logout from './Logout';
import Index from './Index';
import Profile from './Profile';
import Compra from './Compra';
import Pedidos from './Pedidos';
import Gestion from './Gestion';
import CocinaPedidos from './CocinaPedidos';
import DeliveryPedidos from './DeliveryPedidos';

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
      
        {/* Ruta para index */}
        <Route path="/index" element={<Index />} />

        {/* Ruta para pasarela de compra */}
        <Route path="/compra" element={<Compra />} />

        {/* Ruta para gestión de usuarios y estadísticas */}
        <Route path="/gestion" element={<Gestion />} />

        {/* Ruta para gestión de pedidos */}
        <Route path="/pedidoCocina" element={<CocinaPedidos />} />
       
        {/* Ruta para gestión de pedidos */}
        <Route path="/deliveryPedidos" element={<DeliveryPedidos />} />
       
        {/*  */}
        <Route path="/pedidos" element={<Pedidos />} />

        {/* Ruta para desloguearse */}
        <Route path="/logout" element={<Logout />} />
        
        {/* Ruta para protected */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
