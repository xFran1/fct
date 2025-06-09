import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dot, MapPin, Minus, MousePointer2, MoveLeft, Plus, User } from "lucide-react";
import { messages } from "./lang/messages";
import { IntlProvider, FormattedMessage } from "react-intl";
import Languages from "./components/Languages";
import ModalLocationComprar from "./components/ModalLocationComprar";
import Catalogo from "./components/Catalogo";
import Swal from 'sweetalert2'

const Compra = () => {
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

 
    useEffect(() => {
     Axios
      .post(
        "http://localhost:5000/getProducts",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        cestaCalculo(response.data);
      })
      .catch((error) => {});
  }, []);
  const [cesta, setCesta] = useState([]);

 function cestaCalculo(data){
    setCesta(data)
    let totalCantidad = 0;
    let totalPrecio = 0;
    data.forEach(element => {
    totalCantidad += element.cantidad;
    totalPrecio += (element.precio*element.cantidad);
    // console.log(totalCantidad)
    });
    
    totalPrecio = (Math.trunc(totalPrecio * 100) / 100).toFixed(2)
  setCantidad(totalCantidad);
  setPrecio(totalPrecio);
  
  }

  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [total, setTotal] = useState(0);
function deleteSingleProduct(id,comentarios){
     Axios
      .post(
        "http://localhost:5000/deleteSingleProduct",
        {
          id,
          comentarios
        },
        { withCredentials: true }
      )
      .then((response) => {
        
        cestaCalculo(response.data);
        
      })
      .catch((error) => {});
  
  }

  function addSingleProduct(id,comentarios){
     Axios
      .post(
        "http://localhost:5000/addSingleProduct",
        {
          id,
          comentarios
        },
        { withCredentials: true }
      )
      .then((response) => {
        
        cestaCalculo(response.data);
        
      })
      .catch((error) => {});
  
  }
  function pagar(){
    Axios
      .post(
        "http://localhost:5000/pagar",
        {
        
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data)

        if(response.data==false){
           // Tiene direccion activa
            if(cantidad==0){
                Swal.fire({
                    title: lang === "es" ? "No tienes ningún producto en la cesta" : "You don't have any product in your order",
                    icon: "error",
                });
            }else{

                let totalCalculado = 0;
                    if (precio !== undefined && precio !== null) {
                        totalCalculado = precio > 15 ? parseFloat(precio) : parseFloat(precio) + 0.99;
                    }
                // Entra a pagar
                Axios
                    .post(
                        "http://localhost:5000/pasarela",
                        {
                            total: totalCalculado
                        },
                        { withCredentials: true }
                    )
                    .then((response) => {
                        window.location.href = response.data.url;

                    })
                    .catch((error) => {});
                
                    }
                

            }else{
                // No hay activo debe avisar al usuario

                Swal.fire({
                    title: lang === "es" ? "No tienes una dirección activa" : "You don't have an active address",
                    icon: "error",
                });
            }
            
        })
      .catch((error) => {});
  
  }

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
        {loading ? 
        (
            <div className='w-full h-screen flex justify-center items-center '>
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
        :
        (
            <div className="w-12/12 bg-amber-200">
                 <header className=" w-11/12 xl:w-10/12 m-auto pt-2 pb-2 bg-amber-500 flex justify-between items-center ">
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
                        <FormattedMessage  id='resumen_entrega' />   
                    </div>
                    <div className='font-bold text-4xl mt-3'>
                        Don Burguer
                    </div>
                    <div className='mt-13'>
                        {lang ? 
                        (
                            <div>
                                {cantidad} productos de <span className='font-bold'>Don Burguer</span>
                            </div>
                        )
                        :
                        (
                            <div>
                                {cantidad} products of <span className='font-bold'>Don Burguer</span>
                            </div>
                        )}
                    </div>
                <div className='lg:flex justify-between'>

                            <div className='lg:w-6/12  mt-10 '>
                            <div className='max-h-100 overflow-auto '>

                                {cesta.map((element, index) => {
                        return (
                            <div key={index}>
                            <div className="flex justify-between ">
                                <div className='flex gap-3'>
                                    <div className='bg-[#ECF8F5] p-1 rounded-2xl'>
                                <Minus 
                                size={15} 
                                color="#2ABB9B"
                                onClick={() => deleteSingleProduct(element.id,element.comentarios)}
                                />
                                </div>
                                    {element.cantidad}
                                    <div className='bg-[#ECF8F5] p-1 rounded-2xl'>
                                <Plus 
                                size={15} 
                                color="#2ABB9B"
                                onClick={() => addSingleProduct(element.id,element.comentarios)}

                                />
                                </div>
                                    
                                </div>
                                <div className=''>
                                {lang == "es" ? element.nombre_es : element.nombre_en}
                                </div>
                                <div>{(Math.trunc(element.precio * element.cantidad * 100) / 100).toFixed(2)} €</div>
                            </div>
                            { element.comentarios.length > 0 ? (
                            <div className='flex ms-22 mt-1'>
                                <Dot color='#969696' className='shrink-0'/><div className='text-gray-700 text-sm'>{element.comentarios}</div>
                            </div>
                            ):(
                                null
                            )

                            }
                            <div className='flex mt-1 mb-3 justify-between'>
                                
                                
                            </div>
                            </div>
                        );
                        })}
                        

                        </div>
                        
                        <div className='mt-15 font-bold text-2xl'>
                            <FormattedMessage  id='direccion_entrega' />   
                        </div>
                        <ModalLocationComprar lang={lang}/>

                        

                </div>
                {/* Resumen */}
                <div className='lg:w-4/12 lg:mt-0 mt-15 bg-amber-700 p-5 rounded-xl sombra'>
                    <div className='text-2xl font-semibold'>

                    {lang=='es' ? (
                        <div>
                            Resumen
                            </div>
                    ):
                    (
                        <div>
                            Summary
                            </div>
                    )}
                    </div>
                    
                    <div className='h-1 border-1 border-b-0 border-e-0 border-s-0 w-10/12 m-auto mt-3 border-gray-400 opacity-55'>
                        
                        
                    </div>
                    <div className='flex flex-col gap-3 mt-5 font-semibold'>

                    <div className='flex justify-between '>
                            <FormattedMessage  id='productos' />   
                            <div className=''>
                                {precio} €
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <FormattedMessage  id='envio' />   
                            {precio>15 ? (
                                <div className=' flex gap-2 items-center'>
                                    <div className='text-gray-500 line-through'>
                                    0.99 €
                                    </div>

                                    <div className='bg-yellow-300 px-1 rounded-sm text-sm flex items-center h-5'>
                                     <FormattedMessage  id='gratis' />   

                                    </div>
                                </div>
                            ):(
                                <div className=''>
                                    0.99 €
                                </div>
                            )}
                        </div>
                        <div className='flex justify-between text-xl mt-5'>
                            <div>
                                Total
                            </div>
                            <div>
                                {precio>15 ? (
                                <div className=' flex gap-2 items-center'>
                                    <div className=' '>
                                    {precio} €
                                    </div>

                                    
                                </div>
                            ):(
                                <div className=''>
                                    {(parseFloat(precio) + 0.99).toFixed(2)} €
                                </div>
                            )}
                            </div>
                            
                        </div>
                        
                        <div className='text-sm text-pretty mt-5 text-gray-600'>
                            <FormattedMessage  id='repartidores' />   
                        </div>

                        <button  
                            onClick={()=>pagar()}
                            className='mt-2 bg-emerald-100 text-teal-900 font-bold 
                            cursor-pointer  rounded-lg pt-2 pb-2  hover:bg-emerald-200 duration-200'>
                                <FormattedMessage id='pagar' />
                        </button>

                    </div>
                </div>

               </div>



                </div>
            </div>
        )}
      
    </IntlProvider>
  );
};

export default Compra;
