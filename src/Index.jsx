import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapPin, MousePointer2, User } from "lucide-react";
import { messages } from "./lang/messages";
import { IntlProvider, FormattedMessage } from "react-intl";
import Languages from "./components/Languages";
import ModalLocation from "./components/ModalLocation";
import Catalogo from "./components/Catalogo";
import Swal from 'sweetalert2';

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ||
      (navigator.language.startsWith("es") ? "es" : "en")
  );

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('pago') === 'ok') {
    Swal.fire({
      title: '¡Pago exitoso!',
      text: 'Gracias por tu pedido.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}, []);


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

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <div className="w-12/12 bg-amber-200">
        <header className=" w-11/12 xl:w-10/12 m-auto pt-2 pb-2 bg-amber-500 flex justify-between items-center ">
          <figure className="w-16">
            <img
              className="w-full h-full bg-amber-600"
              src="logo1.png"
              alt="Logo de la marca Don Burguer"
            ></img>
          </figure>
          <div className="flex items-center gap-10">
            {/* Importar */}
            <Languages lang={lang} setLang={setLang} />
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
          </div>
        </header>
        {/* Aqui va el seleccionar el domicilio en caso de no tener */}
        <article className="w-12/12 bg-amber-500">
          <div className="w-11/12 xl:w-10/12 m-auto flex items-center lg:justify-between text-sm lg:text-base">
            <ModalLocation />
          </div>
        </article>

        <Catalogo  lang={lang}/>

       
      </div>
    </IntlProvider>
  );
};

export default Index;
