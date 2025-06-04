import { ChevronRight, CircleHelp, LogOut, TicketPercent, User } from "lucide-react";
import Languages from "./Languages";
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
        

const SideBar = ({visibleLeft,setVisibleLeft,lang,setLang,logged,username}) => {

    return (

    <Sidebar visible={visibleLeft} position="left" onHide={() => setVisibleLeft(false)} className='relative bg-white p-5 '>
        <div className='flex flex-col justify-between h-full'>
        <div>

        <div className='mt-5 flex items-center justify-between'>
{logged ? (
    <a href="/profile">
                <div className="flex bg-slate-50 h-10 p-5 gap-3 items-center rounded-3xl poppins-semibold border-gray-300 border">
                  <User size={20} color="black" strokeWidth={3} />
                  <div className="text-black">{username.username}</div>
                </div>
              </a>
            ) : (
                <a href="/login">
                <div className="flex bg-teal-500 h-10 p-5 gap-3 items-center rounded-3xl poppins-semibold border-gray-300 border">
                  <User size={20} color="white" strokeWidth={3} />
                  <div className="text-white">Iniciar sesión</div>
                </div>
              </a>
            )}
        <Languages lang={lang} setLang={setLang} />
        </div>

        <div className='flex justify-between gap-5 mt-10'>

        <a href='pedidos' className='bg-white hover:bg-gray-200 duration-175 w-full pb-10 pt-5 flex justify-center items-center rounded-2xl border-1'>

                    <figure className='w-20 h-20'>
                        <img className='w-full h-full' src='/bolsa.png'></img>
                        <div className='text-center poppins-semibold'>{lang=='es'?"Pedidos":"Orders"}</div>
                    </figure>
        </a>
        <a href='pedidos' className='bg-white w-full hover:bg-gray-200 duration-175 pb-10 pt-5 flex justify-center items-center rounded-2xl border-1'>
                    <figure className='w-20 h-20'>
                        <img className='w-full h-full' src='/cartera.png'></img>
                        <div className='text-center poppins-semibold'>{lang=='es'?"Cuenta":"Account"}</div>
                    </figure>
        </a>
        </div>

        <div className='bg-white hover:bg-gray-200 cursor-pointer mt-10 border-r-0 border-s-0 duration-175 ease-in-out pt-3 pb-3 flex justify-between p-3 border-gray-300 border  '>
                    <div className='flex items-center gap-3 '>
                        <TicketPercent size={ 20 } />
                        <div>{lang=='es'?"Códigos promocionales":"Discount codes"}</div>
                        
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>

        <div className='bg-white hover:bg-gray-200 cursor-pointer border-t-0 border-r-0 border-s-0 duration-175 ease-in-out pt-3 pb-3 flex justify-between p-3 border-gray-300 border  '>
                    <div className='flex items-center gap-3 '>
                        <CircleHelp size={ 20 } />
                        <div>{lang=='es'?"Preguntas frecuentes":"Discount codes"}</div> 
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>

            </div>
        <div className='bg-white hover:bg-gray-200 cursor-pointer border-r-0 border-s-0 duration-175 ease-in-out pt-3 pb-3 flex justify-between p-3 border-gray-300 border  '>
                    <div className='flex items-center gap-3 '>
                        <LogOut size={ 20 } />
                        <div></div>
                        <div>{lang=='es'?"Cerrar sesión":"Log out"}</div> 
                    
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
            </div>

    </Sidebar>
)
}

export default SideBar;