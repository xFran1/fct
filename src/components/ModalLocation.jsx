import {  FormattedMessage,useIntl  } from "react-intl";
import { useEffect,useState } from 'react';
import Modal from 'react-modal';
import { Building, Building2, ChevronDown, ChevronLeft, House, MapPin, MousePointer2, Search, Sofa, SquarePen } from "lucide-react";
import Swal from 'sweetalert2'
import Axios from "axios";

Modal.setAppElement('#root'); // muy importante para accesibilidad

const ModalLocation = () => {
    const intl = useIntl();


    const [isOpen, setIsOpen] = useState(false);
   
    const [faseLista, setFaseLista] = useState(false); // 'lista' or 'añadir'
    const [faseNuevaDireccion, setFaseNuevaDireccion] = useState(false); // 'lista' or 'añadir'
    const [faseDatosDireccion, setFaseDatosDireccion] = useState(false); // 'lista' or 'añadir'
    
    const [faseUpdate, setFaseUpdate] = useState(false); // 'lista' or 'añadir'

    const [tipoEdificio,setTipoEdificio] = useState(null);
    const [direccion,setDireccion] = useState(null);
    const [planta,setPlanta] = useState(null);
    const [puerta,setPuerta] = useState(null);
    const [observacion,setObservacion] = useState(null);
    const [telefono,setTelefono] = useState(null);

    const [domicilios,setDomicilios] = useState([]);

    const [domicilioActivo,setDomicilioActivo] = useState(false);
    const [domicilioActivoTexto,setDomicilioActivoTexto] = useState(null);
   
    const reset = () => {
      setDireccion("")
      setPlanta("")
      setPuerta("")
      setObservacion("")
      setTelefono("")
    }

    const volverFaseLista = () => {
      setFaseLista(true);
      setFaseNuevaDireccion(false);
    } 
    const volverFaseDireccion = () => {
      setFaseLista(false);
      setFaseNuevaDireccion(true);
      setFaseDatosDireccion(false);
    } 
    const handleTipoEdificio = (edificio) => {
      setTipoEdificio(edificio);
      setFaseNuevaDireccion(false);
      setFaseDatosDireccion(true);
    }

    // Fases: 1.Lista 2.NuevaDireccion 3.Tipo de lugar 4.Detalles
    // Función para cerrar el modal y resetear la fase
    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsOpen(true)
        setFaseLista(true);
        setFaseNuevaDireccion(false);
        setFaseDatosDireccion(false);   
        setFaseUpdate(false)  
        reset();

    }

    const updateAddress = () => {
        setIsOpen(true);
        setFaseUpdate(true);
        setFaseLista(false);
        setFaseNuevaDireccion(false);
        setFaseDatosDireccion(false);  
        reset();

    }
   
    const handleNuevaDireccion = () => {
      setFaseLista(false); // Cambiar la fase desde 'lista' a 'nueva dirección'
      setFaseNuevaDireccion(true); // Cambiar la fase a nueva dirección
      
      // El modal permanece abierto, solo se cambia la fase interna
    };

    const handleConfirmarDireccion = async () => {
      setIsOpen(false)
      setFaseLista(false);
      setFaseNuevaDireccion(false);
      setFaseDatosDireccion(false);
    
      try {
        await Axios.post("http://localhost:5000/insert-address", {
          telefono: telefono,
          tipo: tipoEdificio,
          direccion: direccion,
          planta: planta,
          puerta: puerta,
          observacion: observacion,
        }, {
          withCredentials: true
        });
    
        await search_active_address();
        await fetchDomicilios();
    
        Swal.fire({
          title: intl.formatMessage({ id: 'direccion_registrada_correctamente' }),
          icon: "success",
        });
    
      } catch (error) {
        
      }
    }

    const fetchDomicilios = async () => {
      Axios.post("http://localhost:5000/get-addresses", {}, { withCredentials: true })
        .then((response) => {
          setDomicilios(response.data.data);
        })
        .catch((error) => {
          console.error("Error al obtener domicilios", error);
        });

      
        
    };

    const search_active_address = async () => {

      Axios.post("http://localhost:5000/active-address", {}, { withCredentials: true })
      .then((response) => {
        
        const datos = response.data.data;
        if (!datos || Object.keys(datos).length === 0) {
          // console.log("No se recibió ningún dato.");
        } else {
          setDomicilioActivoTexto(response.data.data.direccion)
          setDomicilioActivo(true)
        }
      })
      .catch((error) => {
        
      });
    }
    
    useEffect(() => {
      fetchDomicilios();
      search_active_address();
    }, []);

    useEffect(() => {
      console.log("Domicilios actualizados:", domicilios);
    }, [domicilios]);
    
    const cambioDireccion = async (idDomicilio) => {

      Axios.post("http://localhost:5000/cambiar-address", {idDomicilio}, { withCredentials: true })
      .then((response) => {
        console.log(response)
        fetchDomicilios();
        search_active_address();
        
      })
      .catch((error) => {
        
      });
    }
   

return (
  <>
        { domicilioActivo ? (
          <div className='flex items-center gap-2' onClick={handleOpenModal}>
              <figure className='w-8'>
                <img src='/delivery.png'></img>
              </figure>
                  { domicilioActivoTexto }
                <div className='flex items-center'>
                  <ChevronDown size={16} />
                </div>
          </div>
        ) :
        (
          <div className='w-full flex justify-end lg:justify-between'>
              <div className='hidden items-center lg:flex '>
              <figure className='w-13 h-13 shrink-0'>
                <img src='/localizacion.svg' className='w-full h-full' />
              </figure>
              <FormattedMessage id='localizacion'>
                {(text) => <div className="text-sm xl:text-base bg-cyan-200">{text}</div>}
              </FormattedMessage>
              </div>
              <div onClick={handleOpenModal} className='flex gap-2 md:gap-5 justify-center bg-white items-center h-12 w-52 lg:px-4 rounded-xl shrink-0'>
                <div className='flex gap-2 text-sm md:text-base font-semibold items-center'>             
                  <MapPin strokeWidth={1} />
                    <FormattedMessage id='localizacion_direccion' >
                      {(text) => <div className="text-sm">{text}</div>}
                    </FormattedMessage>
                
                
                </div>
              </div>
        
          </div>
        )
        }

        
             
        <Modal
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
          closeTimeoutMS={300}
          contentLabel="Ejemplo Modal"
          className="modal-content w-11/12 md:w-xl px-12 pt-12 pb-6 flex flex-col"
          overlayClassName="modal-overlay"
          style={{content:{ height: '550px' }}}
        >
        <button className='absolute boton right-4 top-4 cursor-pointer' onClick={() => setIsOpen(false)}></button>
      { faseLista && (
        <div className='h-full flex flex-col gap-6 '>
          <h3 className="text-xl font-bold w-full">
            <FormattedMessage id='localizacion_modal_title' />
          </h3>          

        <div className='overflow-y-auto text-sm lg:text-base'>
          {domicilios.map((domicilio, index) => (
            domicilio.activo
              ? (
                  <div className='border-1 mb-2 border-emerald-200 flex 
                  justify-between items-center rounded-lg p-4' key={index}>
                    <div className='flex items-center gap-3 '>
                      <div className='hidden lg:block'>
                        <MousePointer2 />
                      </div>
                      <div>
                        <div>{domicilio.direccion}</div>
                        <div className='text-gray-700 text-sm'><FormattedMessage id='localizacion_ubicacion_actual' /></div>
                      </div>
                    </div>
                    <div className='bg-gray-200 p-1.5 rounded-3xl'>
                      <SquarePen />
                    </div>
                  </div>
                )
              : 
              (
                
                  <div className='border-1 mb-2 border-amber-300 flex 
                    justify-between items-center rounded-lg p-4' onClick={() => cambioDireccion(domicilio.id)} key={index}>
                    <div className=''>
                      <div>{domicilio.direccion}</div>

                    </div>
                    <div className='bg-gray-200 p-1.5 rounded-3xl' 
                    onClick={(e) => {
                      e.stopPropagation()
                      // Aqui abre el modal para update
                      updateAddress()
                    }
                      
                      }>
                      <SquarePen />
                    </div>
                  </div>
                
              )
            
          ))}
        </div>

          <button  
             onClick={handleNuevaDireccion} 
            className='mt-auto bg-emerald-100 text-teal-900 font-bold 
            cursor-pointer  rounded-3xl pt-3 pb-3 hover:bg-emerald-200 duration-200'>
                <FormattedMessage id='localizacion_modal_button' />
          </button>
        </div>

        

      )}
        { faseNuevaDireccion && (
        <>
         <h3 className="text-xl font-bold w-full flex items-center gap-5 pt-5">
            <div onClick={ volverFaseLista }><ChevronLeft className='cursor-pointer' size={22}/></div> <FormattedMessage id='localizacion_modal_title' />
         </h3>

         <div className='flex h-100  justify-center items-center '>
          <div className='grid grid-cols-2 gap-2 items-center w-full  h-7/12'>
            {/* Casa,Apartamento,Oficina,Otro */}
            <div className='flex items-center justify-center cursor-pointer ' onClick={() => handleTipoEdificio("Casa")}>
              <div className='poppins-regular flex w-60  h-16 items-center justify-center border-1 border-gray-300 bg-gray-100 relative rounded-lg'><div className='absolute left-3'><House />
              </div><FormattedMessage id='localizacion_modal_opcion_casa' /></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer' onClick={() => handleTipoEdificio("Apartamento")}>
              <div className='poppins-regular flex w-60 h-16 items-center justify-center border-1 border-gray-300 bg-gray-100 relative rounded-lg'><div className='absolute left-3'><Building />
              </div><FormattedMessage id='localizacion_modal_opcion_apartamento' /></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer' onClick={() => handleTipoEdificio("Oficina")}>
              <div className='poppins-regular flex w-60 h-16 items-center justify-center border-1 border-gray-300 bg-gray-100 relative rounded-lg'><div className='absolute left-3'><Building2 />
              </div><FormattedMessage id='localizacion_modal_opcion_oficina' /></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer' onClick={() => handleTipoEdificio("Otros")}>
              <div className='poppins-regular flex w-60 h-16 items-center justify-center border-1 border-gray-300 bg-gray-100 relative rounded-lg'><div className='absolute left-3'><Sofa />
              </div><FormattedMessage id='localizacion_modal_opcion_otro' /></div>
            </div>

          </div>
         </div>

          
        </>

        

      )}

      { faseDatosDireccion && (
        <>
        <div className=' h-full flex flex-col justify-between'>

         <h3 className="text-xl font-bold w-full flex items-center gap-5 pt-5">
            <div onClick={ volverFaseDireccion }><ChevronLeft className='cursor-pointer' size={22}/></div> <FormattedMessage id='localizacion_modal_datos_title' />
         </h3>
        <div className='flex justify-center mt-12'>
          <div className=" w-10/12 gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
          { tipoEdificio == "Casa" && (<><House /></> )}
          { tipoEdificio == "Apartamento" && (<><Building /></> )}
          { tipoEdificio == "Oficina" && (<><Building2 /></> )}
          { tipoEdificio == "Otros" && (<><Sofa /></> )}

          {/* Dirección */}
          <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' onChange={(e) => setDireccion(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_subtitle' })}></input>
          </div>
        </div>

        <div className='w-10/12 m-auto  mt-8'>
         <div className='m-auto flex justify-between'>

        
            <div className="w-5/12 gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
            <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' onChange={(e) => setPlanta(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_planta' })}></input>
            </div>
        
            <div className="w-5/12 gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
            <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' onChange={(e) => setPuerta(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_puerta' })}></input>
              </div>
            </div>
        <div className=' m-auto  justify-between mt-8'>
          <div className="w-full gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
           <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' onChange={(e) => setObservacion(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_observaciones' })}></input>
          </div>
        </div>
        <div className=' m-auto  justify-between mt-8'>
          <div className="w-full gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
           <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' onChange={(e) => setTelefono(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_telefono' })}></input>
          </div>
        </div>
        </div>
       
        <div className='mt-auto flex justify-center'>

          <button  
              onClick={handleConfirmarDireccion} 
              className=' w-10/12 bg-emerald-100 text-teal-900 font-bold 
              cursor-pointer  rounded-3xl pt-3 pb-3 hover:bg-emerald-200 duration-200'>
                  <FormattedMessage id='localizacion_modal_datos_boton' />
            </button>
          </div>

        </div>

        </>

        

      )}
      { faseUpdate && (
        <>
        <div className=' h-full flex flex-col justify-between'>

         <h3 className="text-xl font-bold w-full flex items-center gap-5 pt-5">
            <div onClick={ volverFaseDireccion }><ChevronLeft className='cursor-pointer' size={22}/></div> <FormattedMessage id='localizacion_modal_datos_title' />
         </h3>
        <div className='flex justify-center mt-12'>
          <div className=" w-10/12 gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
          { tipoEdificio == "Casa" && (<><House /></> )}
          { tipoEdificio == "Apartamento" && (<><Building /></> )}
          { tipoEdificio == "Oficina" && (<><Building2 /></> )}
          { tipoEdificio == "Otros" && (<><Sofa /></> )}

          {/* Dirección */}
          <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_subtitle' })}></input>
          </div>
        </div>

        <div className='w-10/12 m-auto  mt-8'>
         <div className='m-auto flex justify-between'>

        
            <div className="w-5/12 gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
            <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' value={planta} onChange={(e) => setPlanta(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_planta' })}></input>
            </div>
        
            <div className="w-5/12 gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
            <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' value={puerta} onChange={(e) => setPuerta(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_puerta' })}></input>
              </div>
            </div>
        <div className=' m-auto  justify-between mt-8'>
          <div className="w-full gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
           <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' value={observacion} onChange={(e) => setObservacion(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_observaciones' })}></input>
          </div>
        </div>
        <div className=' m-auto  justify-between mt-8'>
          <div className="w-full gap-4 flex items-center  focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-12">
           
           <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder={intl.formatMessage({ id: 'localizacion_modal_datos_telefono' })}></input>
          </div>
        </div>
        </div>
       
        <div className='mt-auto flex justify-center'>

          <button  
              onClick={handleConfirmarDireccion} 
              className=' w-10/12 bg-emerald-100 text-teal-900 font-bold 
              cursor-pointer  rounded-3xl pt-3 pb-3 hover:bg-emerald-200 duration-200'>
                  <FormattedMessage id='localizacion_modal_datos_boton' />
            </button>
          </div>

        </div>

        </>

        

      )}
        </Modal>
      
    
    </>
);

}
export default ModalLocation;