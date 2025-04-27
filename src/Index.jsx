import { useEffect,useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, MousePointer2, User } from 'lucide-react';
import { messages } from './lang/messages';
import { IntlProvider, FormattedMessage } from "react-intl";
import  Languages  from './components/Languages';
import ModalLocation from './components/ModalLocation';

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState('');
  const [logged,setLogged] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('lang') || (navigator.language.startsWith("es") ? "es" : "en"));

  
 
  useEffect(() => { 
    setLogged(false);
    // Hacer la solicitud al backend para verificar si el token es válido
    Axios.post("http://localhost:5000/index", {}, { withCredentials: true })
      .then((response) => {
        console.log(response.data.user)
        if(response.data.user){
          setUsername(response.data.user);  // Almacena los datos del usuario decodificados
          setLogged(true);
          }
        // console.log(response.data.decoded.username)
        // Si la respuesta es exitosa, guarda los datos del usuario
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
    <IntlProvider locale={lang} messages={messages[lang]}>

    <div className='w-12/12 bg-amber-200'>
        <header className=' w-11/12 xl:w-9/12 m-auto pt-2 pb-2 bg-amber-500 flex justify-between items-center '> 
          <figure className='w-16'>
            <img className='w-full h-full bg-amber-600' src='logo1.png' alt='Logo de la marca Don Burguer'></img>
          </figure>
          <div className='flex items-center gap-10'>
                  {/* Importar */}
            <Languages lang={lang} setLang={setLang} />
          {logged ? 
          (
            <a href='/profile'>
            <div className='flex bg-slate-50 h-10 p-5 gap-3 items-center rounded-3xl poppins-semibold border-gray-300 border'> 
              <User size={20} color='black' strokeWidth={3}/>
              <div className='text-black'>{username.username}</div>
            </div>
            </a>
          )
        :
          (
          <a href='/login'>
            <div className='flex bg-teal-500 h-10 p-5 gap-3 items-center rounded-3xl poppins-semibold border-gray-300 border'> 
              <User size={20} color='white' strokeWidth={3}/>
              <div className='text-white'>Iniciar sesión</div>
            </div>
          </a>
           
          )
        }
          </div>
        </header>
        {/* Aqui va el seleccionar el domicilio en caso de no tener */}
        <article className='w-12/12  bg-amber-500'>
        
        <div className='w-11/12 xl:w-9/12   m-auto flex items-center justify-center lg:justify-between'>
          <div className='hidden lg:flex items-center max-w-lg bg-amber-700'>

          <figure className='w-16 h-16 shrink-0'>
            <img src='/localizacion.svg' className='w-full h-full'></img>
          </figure>
              <FormattedMessage  id='localizacion' >
              {(text) => <div className="text-sm xl:text-base ">{text}</div>}
              </FormattedMessage>
          </div>
            
            <div className='flex gap-2 md:gap-5 bg-white items-center py-2 px-2 lg:px-4 rounded-xl shrink-0'>

              <div className='flex gap-2 text-sm md:text-base font-semibold items-center'>             
                <MapPin strokeWidth={1} />
                <ModalLocation />
              </div>
              

              <div className='flex gap-2 items-center text-sm bg-emerald-50 px-7 md:px-4 py-2 rounded-3xl'>
                <div style={{ transform: 'scaleX(-1)' }}>
                <MousePointer2 strokeWidth={1} color='#007A55'/>
                </div>
                <FormattedMessage id='localizacion_actual' >
                {(text) => <div className="font-bold text-emerald-700">{text}</div>}
                </FormattedMessage>
              </div>

            </div>
            </div>
        </article>

        <h1><FormattedMessage id='welcome' /></h1>
        <p><FormattedMessage id='home_title' /></p>
        
    </div>
    </IntlProvider>

  );
};

export default Index;
