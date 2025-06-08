import { useEffect,useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Logout() {
    const navigate = useNavigate(); // <- Esto es lo que faltaba

    useEffect(() => {
        // Hacer la solicitud al backend para verificar si el token es válido
        Axios.post("http://localhost:5000/logout", {}, { withCredentials: true })
          .then((response) => {
            if (response.status === 200) {
              setTimeout(() => {
                navigate('/'); // Aquí rediriges a la página protegida
              }, 2000);
                // Redirige después de 2 segundos
              }  
          })
          .catch((error) => {
            
          });
      }, [navigate]);  // El useEffect se ejecuta solo una vez cuando el componente se monta
  return (
   <div>Cerrando sesión</div>
  );
}

export default Logout;
