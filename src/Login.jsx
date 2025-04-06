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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl mb-4">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Entrar
        </button>
        
        {message && <p className="mt-3 text-center">{message}</p>}

        {/* Agregar enlace a la página de Sign Up */}
        <p className="mt-4 text-center">
          ¿No tienes una cuenta? 
          <Link to="/signup" className="text-blue-500 ml-1">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
