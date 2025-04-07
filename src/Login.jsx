import { useState } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';  // Importar Link desde react-router-dom

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/api/auth/login",{
        email: email,
        password: password,
      }).then((res) => {
        setMessage(res.data.message);
      }).catch((error) => {
        setMessage("Error: " + error.response.data.message);
      });
  };

  return (
     <div className="grid grid-cols-2 gap-4 h-screen ">
          
          <div className=" flex flex-col  items-center justify-center">
            <form
            onSubmit={handleLogin}
            className="flex flex-col w-8/12 gap-3"
          >
            <div>Hamburguesería inicio sesión</div>
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
              <Link to="/signup" className="text-blue-500 ml-1">
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
}

export default Login;
