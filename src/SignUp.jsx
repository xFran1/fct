import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";  // Importa useNavigate
import Swal from 'sweetalert2'

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageUsername, setMessageUsername] = useState("");
  const [message, setMessage] = useState("");
  

  const navigate = useNavigate();  // Crea la instancia de navigate

  const handleSignUp = async (e) => {
    e.preventDefault();  // Evitar la recarga de la página

    // Validaciones
    let valido = true; // Usamos una variable local


    if(!email.includes("@")){
      setMessageEmail("El email es incorrecto.");
      valido = false;
    }else{
      setMessageEmail("");

    }

    const passwordRegex = /^(?=.*\d).{6,}$/;
    
    if (!passwordRegex.test(password)) {
      setMessagePassword("La contraseña debe tener al menos 6 caracteres y contener al menos un número.");
      valido = false;
    }else{
      setMessagePassword("");

    }

    if (username.length<3) {
      setMessageUsername("El nombre debe tener al menos 3 carácteres");
      valido = false;
    }else{
      setMessageUsername("");

    }
    if(valido==false){
      return;
    }
    
    // Realizar la solicitud POST al backend para registrar al usuario
    Axios.post("http://localhost:5000/signup", {
      username: username,
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.status === 201) {
        Swal.fire({
          title: "Usuario registrado correctamente",
          icon: "success",
        });
  
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    })
      
    .catch((error) => {
      if (error.response?.status === 400) {
        setMessageEmail(error.response.data.message);
      } else {
        setMessage("Error: " + (error.response?.data?.message || "Error inesperado"));
      }
    });
  }

  return (
    
    <div className="grid grid-cols-2 gap-4 h-screen ">
      
      <div className=" flex flex-col  items-center justify-center">
        <form
        onSubmit={handleSignUp}
        className="flex flex-col w-8/12 gap-8"
      >
        <div>Hamburguesería registro</div>
        {/* Campo de nombre */}
        <div className="flex flex-col gap-2">
        <span>Username</span>
       
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="borde-personalizado"
        />
        <div className="text-red-500 h-2 text-sm">{messageUsername}</div>


         </div>
        {/* Campo de email */}
        <div className="flex flex-col gap-2">
        <span>E-mail</span>
       
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="borde-personalizado"
        />
        <div className="text-red-500 h-2 text-sm">{messageEmail}</div>


         </div>
        {/* Campo de contraseña */}
        <div className="flex flex-col gap-2">
        <span>Password</span>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="borde-personalizado"
        />
         <div className="text-red-500 h-2 text-sm">{messagePassword}</div>


    </div>

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
