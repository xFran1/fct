import {  FormattedMessage } from "react-intl";
import { useEffect,useState } from 'react';
import Modal from 'react-modal';
import { ChevronLeft, Search } from "lucide-react";
Modal.setAppElement('#root'); // muy importante para accesibilidad


const ModalLocation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [faseLista, setFaseLista] = useState(false); // 'lista' or 'añadir'
    const [faseNuevaDireccion, setFaseNuevaDireccion] = useState(false); // 'lista' or 'añadir'

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
    const volverFaseLista = () => {
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
            <div onClick={ volverFaseLista }><ChevronLeft size={22}/></div> <FormattedMessage id='localizacion_modal_title' />
         </h3>          
          <div className='flex mt-6 border-1 border-gray-300 w-11/12 m-auto p-2 rounded-3xl gap-2 focus-within:border-green-200 duration-300'>
            <Search strokeWidth={1} /> 
            <input className="appearance-none border-none w-10/12 bg-transparent p-0 m-0 focus:outline-none" placeholder="Buscar dirección"></input>
          </div>

          <button  
             onClick={handleNuevaDireccion} 
            className='mt-auto bg-emerald-100 text-teal-900 font-bold 
            cursor-pointer  rounded-3xl pt-3 pb-3 hover:bg-emerald-200 duration-200'>
                <FormattedMessage id='localizacion_modal_actual_button' />
          </button>
        </>

        

      )}
        </Modal>
      
    
    </>
);

}
export default ModalLocation;