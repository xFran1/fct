import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";  // Importa useNavigate

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();  // Crea la instancia de navigate

  const handleSignUp = async (e) => {
    e.preventDefault();  // Evitar la recarga de la página

    // Realizar la solicitud POST al backend para registrar al usuario
    Axios.post("http://localhost:5000/api/auth/signup", {
      email: email,
      password: password,
    })
      .then((response) => {
        setMessage(response.data.message);  // Mensaje de éxito
        setTimeout(() => {
            navigate('/login');  // Redirigir al login después de 2 segundos
          }, 2000);
        })
      
      .catch((error) => {
        setMessage("Error: " + error.response.data.message);  // Mensaje de error
      });
  };
    

  return (
    
    <div className="grid grid-cols-2 gap-4 h-screen ">
      
      <div className=" flex flex-col  items-center justify-center">
        <form
        onSubmit={handleSignUp}
        className="flex flex-col w-8/12 gap-3"
      >
        <div>Hamburguesería registro</div>
        {/* Campo de email */}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="borde-personalizado"
        />

        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="borde-personalizado"
        />
        {/* Botón de envío */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Registrarse
        </button> 
         {/* Enlace para redirigir al login */}
         <p className=" text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-500 ml-1">
            Inicia sesión aquí
          </Link>
        </p>
        </form>       
      </div>

      <div>
a 
      </div>
    
    </div>
  );
};

export default SignUp;
