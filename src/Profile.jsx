import { useEffect,useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Languages } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { TicketPercent } from 'lucide-react';
import { CircleHelp } from 'lucide-react';
import { LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState('');
  const [logged,setLogged] = useState(false);

  useEffect(() => { 
    setLogged(false);
    // Hacer la solicitud al backend para verificar si el token es válido
    Axios.post("http://localhost:5000/profile", {}, { withCredentials: true })
      .then((response) => {
        console.log(response.data.user)
        if(response.data.user){
          setUsername(response.data.user);  // Almacena los datos del usuario decodificados
          setLogged(true);
        }else{
            navigate('/'); // Aquí rediriges a la página protegida   
        }
    
      })
      .catch((error) => {
        // Si hay un error (token inválido o expirado), muestra el mensaje
        setMessage(error.response?.data?.message || "Error desconocido");

        // // Si el token ha expirado o es inválido, redirige al login
        // if (error.response && error.response.status === 401) {
        //   console.log(error.response)
        // }
        
      });
  }, [navigate]);  // El useEffect se ejecuta solo una vez cuando el componente se monta

  return (
    <div className='w-12/12 bg-amber-200'>
    <header className=' w-11/12 m-auto pt-2 pb-2 bg-amber-500 flex justify-between items-center '> 
      <figure className='w-16'>
        <img className='w-full h-full bg-amber-600' src='logo1.png' alt='Logo de la marca Don Burguer'></img>
      </figure>
     
        {username && (
          <div className='flex bg-slate-50 h-10 p-5 gap-3 items-center rounded-3xl poppins-semibold border-gray-300 border'> 
                <User size={20} color='black' strokeWidth={3}/>
                <div className='text-black'>{username.username}</div>
          </div>
        )}
       
          
    </header>
    <main className='w-11/12 max-w-xl m-auto bg-amber-600 mt-4'>
       
            {username && (
                <div className='flex gap-4'>
                    <div className='poppins-semibold w-14 h-14 rounded-4xl flex justify-center items-center bg-green-200 border-white border'> {username.username.charAt(0).toUpperCase()} </div>
                    <div className='poppins-regular flex items-center text-xl'> {username.username} </div>
                </div>
            )}
            <div className='poppins-semibold mt-5 text-2xl'>
                Perfil
            </div>
            <div className='flex w-full bg-blue-900 justify-between mt-6'>
                <div className='bg-white w-55 pb-10 pt-5 flex justify-center items-center rounded-2xl'>
                    <figure className='w-20 h-20'>
                        <img className='w-full h-full' src='/bolsa.png'></img>
                        <div className='text-center poppins-semibold'>Pedidos</div>
                    </figure>
                </div>
                <div className='bg-white w-55 pb-10 pt-5 flex justify-center items-center rounded-2xl'>
                    <figure className='w-20 h-20'>
                        <img className='w-full h-full' src='/cartera.png'></img>
                        <div className='text-center poppins-semibold'>Cuenta</div>
                    </figure>
                </div>
            </div>
            <div className='mt-8'>
            <a href=''>

                <div className='bg-white hover:bg-gray-100 duration-300 ease-in-out pt-3 pb-3 flex justify-between p-3 border-gray-300 border rounded-xl rounded-b-none'>
                    <div className='flex items-center gap-3 '>
                        <Languages size={ 20 } />
                        <div>Idioma</div>
                    </div>
                    <div>
                        <ChevronRight  />
                    </div>
                </div>
                </a>

                <a href=''>
                <div className='bg-white hover:bg-gray-100 duration-300 ease-in-out pt-3 pb-3 flex justify-between p-3 border-gray-300 border  '>
                    <div className='flex items-center gap-3 '>
                        <TicketPercent size={ 20 } />
                        <div>Códigos promocionales</div>
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
                </a>

                <a href=''>
                <div className='bg-white hover:bg-gray-100 duration-300 ease-in-out pt-3 pb-3 flex justify-between p-3 border-gray-300 border '>
                    <div className='flex items-center gap-3 '>
                        <CircleHelp size={ 20 } />
                        <div>Preguntas frecuentes</div>
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
                </a>

                <a href='/logout'>
                <div className='bg-white hover:bg-gray-100 duration-300 ease-in-out pt-3 pb-3 flex justify-between p-3 border-gray-300 border rounded-xl rounded-t-none'>
                    <div className='flex items-center gap-3 '>
                        <LogOut size={ 20 } />
                        <div>Cerrar sesión</div>
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
                </a>
            </div>
        

    </main>
    
</div>
  );
};

export default Profile;
