import { useState } from "react";
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";  // Importa useNavigate
import Swal from 'sweetalert2'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();  // Crea la instancia de navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/login",{
        email: email,
        password: password,
      }, {
        withCredentials: true // Esto es para que se guarde la cookie
      })
      .then((response) => {
        if (response.status === 200) {
          // Redirige después de 2 segundos
          setTimeout(() => {
            navigate('/'); // Aquí rediriges a la página protegida
          }, 2000);
        }      
      }).catch((error) => {
        console.log(error)
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
              Iniciar Sesión
            </button> 
             {/* Enlace para redirigir al login */}
             <p className=" text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/signup" className="text-blue-500 ml-1">
                Registrate
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
