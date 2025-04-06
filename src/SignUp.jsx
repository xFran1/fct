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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl mb-4">Regístrate</h2>

        {/* Campo de email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        {/* Botón de envío */}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Registrarse
        </button>

        {/* Mensaje de éxito o error */}
        {message && <p className="mt-3 text-center">{message}</p>}

        {/* Enlace para redirigir al login */}
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-500 ml-1">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
