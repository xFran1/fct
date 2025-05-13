import {  FormattedMessage  } from "react-intl";


function Catalogo(){

    return(
        <div className='w-9/12 m-auto bg-amber-900 flex'>
            <div className='bg-red-400 w-2/12'>
a
            </div>
            <div className='bg-blue-400 w-7/12'>
a
            </div>
            <div className='w-3/12 flex flex-col'>

                <div className='bg-white rounded-xl rounded-b-none p-5'>
                    <div className='w-full flex justify-center mt-8 text-xl font-bold'>
                        <FormattedMessage id='catalogo_tu_pedido'  />
                    </div>
                    <div className='flex justify-center mt-5 opacity-65'>
                        <figure className='w-45'>
                            <img className='w-full h-full object-cover' src='/astronauta.webp'></img>
                        </figure>
                    </div>
                    <div className=' text-center mb-5 mt-8 text-base font-semibold text-pretty'>
                        <FormattedMessage id='catalogo_tu_pedido_info'  />
                    </div>
                </div>

                <div className='bg-white rounded-xl mt-1 rounded-t-none'>
                    <div className='w-full flex justify-center mt-8 text-sm '>
                    {/* llega a */}
                        <div className='flex flex-wrap'>
                        <FormattedMessage id='catalogo_tu_pedido_recargo_parte1'  />
                        <span  className='font-semibold'><FormattedMessage id='catalogo_tu_pedido_recargo_parte2'  /></span >
                        <FormattedMessage id='catalogo_tu_pedido_recargo_parte3'  />
                    
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )

}

export default Catalogo