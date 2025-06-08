import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapPin, Menu, MousePointer2, User } from "lucide-react";
import { messages } from "./lang/messages";
import { IntlProvider, FormattedMessage } from "react-intl";
import ModalLocation from "./components/ModalLocation";
import Catalogo from "./components/Catalogo";
import Swal from 'sweetalert2';
import SideBar from "./components/SideBar";

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ||
    (navigator.language.startsWith("es") ? "es" : "en")
  );
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [comidas, setComidas] = useState([]);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('pago') === 'ok') {
    Swal.fire({
      title: '¡Pago exitoso!',
      text: 'Gracias por tu pedido.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
   

  }
}, []);


  useEffect(() => {
    setLogged(false);
    // Hacer la solicitud al backend para verificar si el token es válido
    Axios.post("http://localhost:5000/index", {}, { withCredentials: true })
      .then((response) => {
        console.log(response.data.user);
        if (response.data.user) {
          setUsername(response.data.user); // Almacena los datos del usuario decodificados
          setLogged(true);
        }
      })

      .catch((error) => {});
  }, [navigate]); // El useEffect se ejecuta solo una vez cuando el componente se monta

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <SideBar  visibleLeft={visibleLeft} setVisibleLeft={setVisibleLeft} lang={lang} setLang={setLang} logged={logged} username={username}/>
      <div className="w-12/12 bg-amber-200 relative">

      {visibleLeft?(
<div className='absolute h-full w-full bg-[rgb(0,0,0,0.3)] z-10'>

      </div>
      ):
      (
        <></>
      )
      }
      
        <header className=" w-11/12 xl:w-10/12 m-auto pt-2 pb-2 bg-amber-500 flex justify-between items-center px-5">
          <div 
          className='p-1 hover:border-black border-1 border-transparent rounded-md duration-300 cursor-pointer'
          onClick={()=>{setVisibleLeft(true)}}
          >
            <Menu />
          </div>
          <figure className="w-16">
            <img
              className="w-full h-full bg-amber-600"
              src="logo1.png"
              alt="Logo de la marca Don Burguer"
            ></img>
          </figure>
          
        </header>
        {/* Aqui va el seleccionar el domicilio en caso de no tener */}
        <article className="w-12/12 bg-amber-500">
          <div className="w-11/12 xl:w-10/12 m-auto flex items-center lg:justify-between text-sm lg:text-base">
            <ModalLocation comidas={comidas} setComidas={setComidas}/>
          </div>
        </article>

        <Catalogo  lang={lang} comidas={comidas} setComidas={setComidas} />

       
      </div>
    </IntlProvider>
  );
};

export default Index;
