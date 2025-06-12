import { useRef, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import SideBar from './components/SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRightToLine, CircleArrowRight, Menu, MoveRight } from 'lucide-react';
import Select from 'react-select';
import Swal from 'sweetalert2';

function DeliveryPedidos() {

   const [lang, setLang] = useState(
      localStorage.getItem("lang") ||
      (navigator.language.startsWith("es") ? "es" : "en")
    );
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [username, setUsername] = useState(null);
    const [messages, setMessages] = useState("");
    const [logged, setLogged] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLogged(false);
        // Hacer la solicitud al backend para verificar si el token es válido
        axios.post("http://localhost:5000/index", {}, { withCredentials: true })
        .then((response) => {
            console.log(response.data.user);
            if (response.data.user) {
            setUsername(response.data.user); // Almacena los datos del usuario decodificados
            setLogged(true);
            }
        })

        .catch((error) => {});
  }, [navigate]); // El useEffect se ejecuta solo una vez cuando el componente se monta

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
        // Hacer la solicitud al backend para verificar si el token es válido
        pedidosPendientes();
  }, []); // El useEffect se ejecuta solo una vez cuando el componente se monta

  const [comidas, setComidas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/comida")
      .then((response) => {
        console.log(response.data)
        setComidas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar comidas:", error);
      });

      
  }, []);

const [cargado, setCargado] = useState(false);    

const [repartidores, setRepartidores] = useState();
const [repartidor, setRepartidor] = useState("");

useEffect(() => {
    axios
      .post("http://localhost:5000/repartidores")
      .then((response) => {
        console.log(response.data)
        setRepartidores(response.data)
      })
      .catch((error) => {
        console.error("Error al cargar repartidores", error);
      });

      
  }, []);
  
  const opciones = [
  ...(repartidores && repartidores.length > 0
    ? repartidores.map(r => ({ value: r.id, label: r.username }))
    : [])
  ];

  function asignarPedido(idPedido){

    if(repartidor==""){
      Swal.fire({
        icon: 'warning',
        title: lang=='es'?'Tienes que seleccionar algun repartidor':'You need to choose a delivery man',
        confirmButtonText: 'OK'
      });
    }else{

    axios
      .post("http://localhost:5000/asignarPedido", 
        {
          idPedido:idPedido,
          idRepartidor:repartidor
      }, { withCredentials: true })

      .then((response) => {
        console.log(response.data)

        // Recuperar los pedidosPendientes

      })
      .catch((error) => {
        console.error("Error al asignar pedido", error);
      });

    }
  }

 useEffect(() => {
    const intervalo = setInterval(() => {
      pedidosPendientes();
    }, 10000); // 10000 ms = 10 segundos

    return () => clearInterval(intervalo); // limpiar al desmontar
  }, []);

  const pedidosPendientes = () => {
      axios.post("http://localhost:5000/pedidosPendientesDelivery", {}, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setPedidos(response.data);
            
        })

        .catch((error) => {});  
      };


  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <SideBar  visibleLeft={visibleLeft} setVisibleLeft={setVisibleLeft} lang={lang} setLang={setLang} logged={logged} username={username}/>
      

      <div className='h-screen flex flex-col relative bg-amber-200'>
       
      {/* <div className="w-12/12  bg-amber-200 relative "> */}
       {visibleLeft?(
      <div className='absolute z-50 h-full w-full bg-[rgb(0,0,0,0.3)] '></div>
      ):(
        <></>
      )
      }
      {/* </div>   */}
       <header className=" sombreado  z-1 w-11/12 xl:w-10/12 m-auto pt-2 pb-2 bg-amber-500 flex justify-between items-center px-5">
          <div 
          className='p-1 hover:border-black border-1 border-transparent rounded-md duration-300 cursor-pointer'
          onClick={()=>{setVisibleLeft(true)}}
          >
            <Menu />
          </div>
          <div className='flex items-center gap-10'>
          <figure className="w-16">
            <img
              className="w-full h-full "
              src="logo1.png"
              alt="Logo de la marca Don Burguer"
              ></img>
          </figure>
          </div>
          
        </header>
     {/* CONTENEDOR DE PEDIDOS */}
  <div className='w-11/12 xl:w-10/12 m-auto bg-amber-500 h-full overflow-y-auto pt-4 '>
    <div className="overflow-x-auto whitespace-nowrap h-full">
      <div className="inline-block min-w-max bg-amber-600 h-full">
        {cargado?(
          

        pedidos.map((element,index)=>{
          return(
            <div key={index} className='inline-block bg-amber-300 h-full'>
              <div className='flex flex-col h-full '>
                <div className="w-64 bg-white p-2 m-2 rounded shadow">{lang=='es'?'Pedido':'Order'} {(element.pedido.id).slice(-4)}</div>
                  <div className="h-full bg-white p-2 m-2 rounded shadow flex justify-between flex-col">
                    <div className=''>

                    {element.productos.map((producto,index) => {
                      return(
                         
                      comidas
                        .filter(comida => comida.id === producto.idComida)
                        .map(comida=>{
                          return(              
                            <div 
                            key={comida.id}
                            style={{ 
                              cursor: 'pointer', 
                            }}
                            className='flex text-lg justify-between'
                            >
                              <div >
                              {lang=='es'?comida.nombre_es:comida.nombre_en}
                              </div>
                              <div >
                              {producto.cantidad}
                              </div>
                              
                            </div>
                          )
                          })
                        )

                    })}
                          
                    </div>
                    <div className='flex flex-col'>
                    
                    <div className='flex justify-between items-center'>
                      
                      <div>
                           Total: {element.pedido.total}
                    </div>
                     

                      <div 
                      className='w-7 h-7 bg-teal-200 rounded-4xl flex justify-center items-center cursor-pointer border-gray-100 border'
                      onClick={()=>asignarPedido(element.pedido.id)}
                      >
                        <MoveRight size={18} color='black'/>
                      </div>
                    </div>


                    </div>
                  </div>
                </div>
            </div>
          )
        })
        
        ):(
          <></>
        )}
       

       
         
      </div>
    </div>
  </div>
    </div>


      
    </IntlProvider>
    

  );
}
export default DeliveryPedidos;