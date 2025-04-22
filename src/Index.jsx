import { useEffect,useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import Select from "react-select";
import { messages } from './lang/messages';
import { IntlProvider, FormattedMessage } from "react-intl";

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState('');
  const [logged,setLogged] = useState(false);
  
  
  const savedLang = localStorage.getItem('lang') || (navigator.language.startsWith("es") ? "es" : "en");
  console.log(savedLang," GUARDADA")
  const [lang, setLang] = useState(savedLang);  // Estado para el idioma

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

  const options = [
    {
      value: "es",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://flagcdn.com/es.svg"
            alt="es"
            style={{ width: 20, marginRight: 8 }}
          />
          ES
        </div>
      ),
    },
    {
      value: "en",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://flagcdn.com/gb.svg"
            alt="en"
            style={{ width: 20, marginRight: 8 }}
          />
          EN
        </div>
      ),
    },
  ];

  const handleChange = (selectedOption) => {
    setLang(selectedOption.value); // Actualiza el idioma al valor seleccionado
    localStorage.setItem('lang', selectedOption.value);  // Guarda el idioma en sessionStorage
    console.log(selectedOption.value)
  };

  
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>

    <div className='w-12/12 bg-amber-200'>
        <header className=' w-9/12 m-auto pt-2 pb-2 bg-amber-500 flex justify-between items-center '> 
          <figure className='w-16'>
            <img className='w-full h-full bg-amber-600' src='logo1.png' alt='Logo de la marca Don Burguer'></img>
          </figure>
          <div className='flex items-center gap-10'>
                    <Select 
                    options={options} 
                    value={options.find(opt => opt.value === lang)}  
                    onChange={handleChange} />

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
        <h1><FormattedMessage id="welcome" /></h1>
        <p><FormattedMessage id="home_title" /></p>
    </div>
    </IntlProvider>

  );
};

export default Index;
