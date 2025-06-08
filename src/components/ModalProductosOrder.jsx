import {  FormattedMessage,useIntl  } from "react-intl";
import { useEffect,useState } from 'react';
import Modal from 'react-modal';
import { Building, Building2, ChevronDown, ChevronLeft, Dot, House, MapPin, MousePointer2, Phone, Search, Sofa, SquarePen } from "lucide-react";
import Swal from 'sweetalert2'
import Axios from "axios";

Modal.setAppElement('#root'); // muy importante para accesibilidad

const ModalProductosOrder = ({ isOpen, onRequestClose, data, lang }) => {
    const intl = useIntl();



  
    useEffect(() => {
      console.log(data)
    }, [isOpen==true])
    
  const [comidas, setComidas] = useState([]);

    useEffect(() => {
    Axios
      .get("http://localhost:5000/comida")
      .then((response) => {
        setComidas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar comidas:", error);
      });

     
  }, []);


    const fetchDomicilios = async () => {
      Axios.post("http://localhost:5000/get-addresses", {}, { withCredentials: true })
        .then((response) => {

        })
        .catch((error) => {
          console.error("Error al obtener domicilios", error);
        });

      
        
    };

   
   

return (
  
        
             
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          closeTimeoutMS={300}
          contentLabel="Ejemplo Modal"
          className="relative z-[999] bg-white w-11/12 md:w-xl px-12 pt-12 pb-6 flex flex-col rounded-lg overflow-auto"
          overlayClassName="fixed inset-0 bg-black/50 z-[1000] flex justify-center items-center"
          style={{content:{ height: '540px' }}}
        >
        <button className='absolute boton right-4 top-4 cursor-pointer' onClick={onRequestClose}></button>
    
        <div >
            
                {data!=null?(
                    <div className=' h-110 flex justify-between flex-col'>
                        <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-3'>
                            <div>
                            {lang=='es'?'Tu pedido n°':'Your order n°'}{data.ID}
                             </div>
                             <div>

                            {lang=='es'?'Ahora mismo se encuentra en '+data.Estado:'Right now your order is '+data.Estado}
                            </div>
                        </div>

                     <div className=' max-h-70 overflow-auto'>
                {data.productos.map((element,index) => {
                    return(
                        comidas.filter(comida => comida.id == element.idComida)
                        .map((comida) => (
                            
                            <div key={index} className='grid grid-cols-[10%_73%_17%]'>

                            <div>
                                {element.cantidad}x
                            </div>
                            <div className=''>
                                {lang=='es'?comida.nombre_es:comida.nombre_en}
                            </div>
                            <div>

                                {(Math.trunc(element.cantidad*comida.precio* 100) / 100).toFixed(2)}€
                            </div>
                            { element.comentarios.length > 0 ? (
                                <div className='flex col-start-1 col-end-3'>
                                    <Dot color='#969696' className='shrink-0 '/>
                                    <div className='text-gray-700 text-sm'>{element.comentarios}</div>
                                </div>
                                ):(
                                    null
                                )
                            }
                            
                                
                        </div>
                        
                    ))
                    
                    
                )
                
            })}
                    </div>
            </div>

                    <div className='grid grid-cols-[83%_17%]'>
                        <div>Total:
                    </div>
                        <div>{data.Precio_total}
                    </div>
                    </div>
                    </div>

                ):(
                    <>  
                    </>
                )}
                 
            
        </div>
   
        </Modal>
      
    
    
);

}
export default ModalProductosOrder;