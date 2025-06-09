import { useRef, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import SideBar from './components/SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

 function CocinaPedidos() {
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

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <SideBar  visibleLeft={visibleLeft} setVisibleLeft={setVisibleLeft} lang={lang} setLang={setLang} logged={logged} username={username}/>
      {/* <div className="w-12/12  bg-amber-200 relative ">
       {visibleLeft?(
      <div className='absolute h-full w-full bg-[rgb(0,0,0,0.3)] z-50'>

      </div>
      ):
      (
        <></>
      )
      }
      </div> */}

      <div className='h-screen flex flex-col bg-amber-200'>

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
      <div className="inline-block min-w-max">
        <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 18</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 8</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 10</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 12</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 18</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 8</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 10</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 12</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 18</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 8</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 10</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 12</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 18</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 8</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 10</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 12</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 18</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 8</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 10</div>
                <div className="inline-block w-64 bg-white p-2 m-2 rounded shadow">Pedidos Mesa 12</div>
      </div>
    </div>
  </div>
    </div>


      
    </IntlProvider>
    

  );
}
export default CocinaPedidos;