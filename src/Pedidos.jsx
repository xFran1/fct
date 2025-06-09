import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dot, MapPin, Menu, Minus, MousePointer2, MoveLeft, Plus, User } from "lucide-react";
import { messages } from "./lang/messages";
import { IntlProvider, FormattedMessage } from "react-intl";
import Languages from "./components/Languages";
import Swal from 'sweetalert2'
import SideBar from "./components/SideBar";
import GridPedidos from "./components/GridPedidos";
import ModalProductosOrder from "./components/ModalProductosOrder";

const Pedidos = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ||
      (navigator.language.startsWith("es") ? "es" : "en")
  );

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
    setLoading(false)
    }, 1000);

  }, []); // El useEffect se ejecuta solo una vez cuando el componente se monta
  function volverIndex(){
    navigate('/'); // Aquí rediriges a la página protegida
  }

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
  
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [pedidos, setPedidos] = useState(null)
    useEffect(() => {
       Axios.post("http://localhost:5000/getSingularOrders", {}, { withCredentials: true })
      .then((response) => {
        setPedidos(response.data)
      })

      .catch((error) => {});

    }, []);

   const [isOpen, setIsOpen] = useState(false);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
        <SideBar visibleLeft={visibleLeft} setVisibleLeft={setVisibleLeft} lang={lang} setLang={setLang} logged={logged} username={username}/>

       
 <div className="w-12/12 bg-amber-200 min-h-screen relative">

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
                <div className='xl:w-7/12 w-11/12  m-auto mt-10'>
                    <div className='font-semibold text-2xl flex items-center gap-4'>
                        <MoveLeft className='cursor-pointer' size={18} onClick={() => volverIndex()}/>
                        <FormattedMessage  id='resumen_pedidos' />   
                    </div>
                        
                <div className='lg:flex justify-between'>

                            <div className='lg:w-6/12  mt-10 '>
                            <div className='max-h-100 overflow-auto bg-green-100'>

                        

                        </div>
                        
           
                        

                </div>
                {/* Resumen */}
     
               </div>

         <GridPedidos pedidos={pedidos} lang={lang} />


                </div>
            </div>
        
      
    </IntlProvider>
  );
};

export default Pedidos;
