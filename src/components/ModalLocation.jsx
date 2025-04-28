import {  FormattedMessage } from "react-intl";
import { useEffect,useState } from 'react';
import Modal from 'react-modal';
import { Building, Building2, ChevronLeft, House, Search, Sofa } from "lucide-react";
Modal.setAppElement('#root'); // muy importante para accesibilidad


const ModalLocation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tipoEdificio,setTipoEdificio] = useState(null);
    const [faseLista, setFaseLista] = useState(false); // 'lista' or 'añadir'
    const [faseNuevaDireccion, setFaseNuevaDireccion] = useState(false); // 'lista' or 'añadir'
    const [faseDatosDireccion, setFaseDatosDireccion] = useState(false); // 'lista' or 'añadir'


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
        
    }
   
    const handleNuevaDireccion = () => {
      setFaseLista(false); // Cambiar la fase desde 'lista' a 'nueva dirección'
      setFaseNuevaDireccion(true); // Cambiar la fase a nueva dirección
      
      // El modal permanece abierto, solo se cambia la fase interna
    };

    

return (
  <>
    
        <button onClick={handleOpenModal}>
          <FormattedMessage id='localizacion_direccion' />
        </button>
             
        <Modal
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
          closeTimeoutMS={300}
          contentLabel="Ejemplo Modal"
          className="modal-content h-7/12 w-11/12 md:w-xl px-12 pt-12 pb-6 flex flex-col"
          overlayClassName="modal-overlay"
        >
        <button className='absolute boton right-4 top-4 cursor-pointer' onClick={() => setIsOpen(false)}></button>
      { faseLista && (
        <>
         <h3 className="text-xl font-bold w-full">
            <FormattedMessage id='localizacion_modal_title' />
        </h3>          


          <button  
             onClick={handleNuevaDireccion} 
            className='mt-auto bg-emerald-100 text-teal-900 font-bold 
            cursor-pointer  rounded-3xl pt-3 pb-3 hover:bg-emerald-200 duration-200'>
                <FormattedMessage id='localizacion_modal_button' />
          </button>
        </>

        

      )}
        { faseNuevaDireccion && (
        <>
         <h3 className="text-xl font-bold w-full flex items-center gap-5 pt-5">
            <div onClick={ volverFaseLista }><ChevronLeft className='cursor-pointer' size={22}/></div> <FormattedMessage id='localizacion_modal_title' />
         </h3>

         <div className='flex h-100 bg-amber-950 justify-center items-center '>
          <div className='grid grid-cols-2 gap-2 items-center w-full  bg-amber-600 h-7/12'>
            {/* Casa,Apartamento,Oficina,Otro */}
            <div className='flex items-center justify-center cursor-pointer ' onClick={() => handleTipoEdificio("Casa")}>
              <div className='poppins-regular flex w-60  h-16 items-center justify-center bg-amber-200 relative rounded-lg'><div className='absolute left-3'><House />
              </div><FormattedMessage id='localizacion_modal_opcion_casa' /></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer' onClick={() => handleTipoEdificio("Apartamento")}>
              <div className='poppins-regular flex w-60 h-16 items-center justify-center bg-amber-200 relative rounded-lg'><div className='absolute left-3'><Building />
              </div><FormattedMessage id='localizacion_modal_opcion_apartamento' /></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer' onClick={() => handleTipoEdificio("Oficina")}>
              <div className='poppins-regular flex w-60 h-16 items-center justify-center bg-amber-200 relative rounded-lg'><div className='absolute left-3'><Building2 />
              </div><FormattedMessage id='localizacion_modal_opcion_oficina' /></div>
            </div>
            <div className='flex items-center justify-center cursor-pointer' onClick={() => handleTipoEdificio("Otros")}>
              <div className='poppins-regular flex w-60 h-16 items-center justify-center bg-amber-200 relative rounded-lg'><div className='absolute left-3'><Sofa />
              </div><FormattedMessage id='localizacion_modal_opcion_otro' /></div>
            </div>

          </div>
         </div>

          
        </>

        

      )}

{ faseDatosDireccion && (
        <>
         <h3 className="text-xl font-bold w-full flex items-center gap-5 pt-5">
            <div onClick={ volverFaseDireccion }><ChevronLeft className='cursor-pointer' size={22}/></div> <FormattedMessage id='localizacion_modal_datos_title' />
         </h3>
        <div className='flex justify-center mt-8 relative'>
          <div className=" w-10/12 flex items-center gap-2 focus-within:border-green-400 duration-200 border-1 rounded-2xl px-5 h-10">
          { tipoEdificio == "Casa" && (<><House /></> )}
          { tipoEdificio == "Apartamento" && (<><Building /></> )}
          { tipoEdificio == "Oficina" && (<><Building2 /></> )}
          { tipoEdificio == "Otros" && (<><Sofa /></> )}
          <input className='appearance-none border-none outline-none bg-transparent p-0 m-0 w-full' placeholder={<FormattedMessage id='localizacion_modal_datos_subtitle' />}></input>
          </div>
        </div>
       

          
        </>

        

      )}
        </Modal>
      
    
    </>
);

}
export default ModalLocation;