import {  FormattedMessage,useIntl  } from "react-intl";
import { useEffect,useState } from 'react';
import Modal from 'react-modal';
import { Building, Building2, ChevronDown, ChevronLeft, Dot, House, MapPin, MousePointer2, Phone, Search, Sofa, SquarePen } from "lucide-react";
import Swal from 'sweetalert2'
import Axios from "axios";
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root'); // muy importante para accesibilidad

const ModalUsers = ({ isOpen, onRequestClose, data, lang }) => {
  const intl = useIntl();
  const [nPedidos, setNPedidos] = useState(0);
  const [cambiar, setCambiar] = useState(false);
  const [rolActual, setRolActual] = useState("");

  useEffect(() => {
    setCambiar(false)
  }, [isOpen])
  
    useEffect(() => {
      if (isOpen && data !== null) {
        console.log(data);

        Axios.post("http://localhost:5000/nPedidosSingulares", 
        { id: data.id }, 
        { withCredentials: true })
        .then((response) => {
            console.log(response.data.nPedidos);
            setNPedidos(response.data.nPedidos)
        })
        .catch((error) => {
            console.error(error);
        });
      }

    }, [isOpen==true,data])
    
  const navigate = useNavigate();  // Crea la instancia de navigate


    function cambiarRol(){
        Axios.post("http://localhost:5000/cambiarRol", 
            { id: data.id,
            rol: rolActual
            },
             
        { withCredentials: true })
        .then((response) => {
            onRequestClose()
            

            Swal.fire({
                icon: 'success',
                text: lang === 'es' ? 'Se ha modificado correctamente' : 'The update was successful',
                confirmButtonColor: '#3085d6',
                confirmButtonText: lang === 'es' ? 'Aceptar' : 'Accept'
                }).then(() => {
                window.location.reload();
                });

        })
        .catch((error) => {
            console.error(error);
        });
    }

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
    
            {data && (

            <div>
                    {cambiar?(
                        <div className='flex items-center mb-3 gap-2'>
                            <select className=' border-1 rounded-sm border-gray-500' 
                            onChange={(e) => setRolActual(e.target.value)}
                            // onChange={(e) => console.log(e.target.value)}
                            >
                                <option value='admin'>{lang=='es'?'Admin':'Admin'}</option>
                                <option value='usuario'>{lang=='es'?'Usuario':'User'}</option>
                                <option value='cocinero'>{lang=='es'?'Cocinero':'Chef'}</option>
                                <option value='repartidor'>{lang=='es'?'Repartidor':'Delivery'}</option>
                            </select>
                            <div className='border-1 border-gray-500 cursor-pointer p-0 px-2 rounded-sm bg-yellow-500'
                            onClick={()=>cambiarRol()}
                            >{lang=='es'?'Cambiar':'Update'}</div>
                        </div>
                        ):
                        (
                        <div className="mb-3">
                            <div className='flex gap-2 items-center'>
                                <span className="text-gray-500 font-semibold ">Rol:</span>
                        
                                <div className='text-sm bg-yellow-600 px-2 text-white rounded-sm cursor-pointer' 
                                onClick={() => setCambiar(true)}
                                >{lang=='es'?'Cambiar':'Update'}
                                </div>
                            </div>
                            <div className="text-lg text-gray-800">{data.Rol}</div>
                    </div>
                        )}
                   

                    <div className="mb-3">
                    <span className="text-gray-500 font-semibold">{lang=='es'?'Usuario':'Username'}:</span>
                    <div className="text-lg text-gray-800">{data.Username}</div>
                    </div>
                    <div className="mb-3">
                    <span className="text-gray-500 font-semibold">Email:</span>
                    <div className="text-lg text-gray-800">{data.Email}</div>
                    </div>
                    <div className="mb-3">
                    <span className="text-gray-500 font-semibold">{lang=='es'?'Fecha creación':'Acc Date'}:</span>
                    <div className="text-lg text-gray-800">{data.Fecha}</div>
                    </div>              
                    <div className="mb-3">
                    <span className="text-gray-500 font-semibold">{lang=='es'?'Número pedidos':'Order quantity'}:</span>
                    <div className="text-lg text-gray-800">{nPedidos}</div>
                    </div>              
            </div>
            )}
            
   
        </Modal>
      
    
    
);

}
export default ModalUsers;