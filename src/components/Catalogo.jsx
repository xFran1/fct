import { FormattedMessage, useIntl, IntlProvider } from "react-intl";
import { useEffect, useState } from "react";
import { Dot, Minus, Plus } from "lucide-react";
import axios from "axios";
import Modal from "react-modal";
import { messages } from "../lang/messages";
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";  // Importa useNavigate

Modal.setAppElement("#root"); // muy importante para accesibilidad

function Catalogo({ lang }) {
  const [categories, setCategories] = useState([]);
  const [categoriasRecibidas, setCategoriasRecibidas] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        setCategories(response.data);
        setCategoriasRecibidas(true);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
      });
  }, []);

  const [comidas, setComidas] = useState([]);
  const [comidasRecibidas, setComidasRecibidos] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/comida")
      .then((response) => {
        setComidas(response.data);
        setComidasRecibidos(true);
      })
      .catch((error) => {
        console.error("Error al cargar comidas:", error);
      });

      const params = new URLSearchParams(window.location.search);
        if (params.get('pago') === 'ok') {
         
          axios.post("http://localhost:5000/deleteOrder", {}, { withCredentials: true })
                .then((response) => {
                })
      
        }
  }, []);

  useEffect(() => {
    console.log(categories);
    console.log(comidas);
  }, [comidas]);

  // Con esto haremos que los elementos del menu lateral brillen cuando estes justo en el

  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const sectionIds = ["1", "2", "3", "4", "5", "6"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // console.log("Observando:", entry.target.id, "isIntersecting:", entry.isIntersecting);

          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.5, // % visible para activarse
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, [categories, comidas]);

  // Función para añadir a la cesta
  const [cesta, setCesta] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(2);
  const [comentarios, setComentarios] = useState("");

  function addProduct(id) {
     console.log(id)
    axios
      .post(
        "http://localhost:5000/addProduct",
        {
          id: id,
          comentarios: comentarios,
        },
        { withCredentials: true }
      )
      .then((response) => {
        cestaCalculo(response.data);
        setIsOpen(false)
        setComentarios("")
      })
      .catch((error) => {});
  }

  function borrarCesta() {
    axios
      .post("http://localhost:5000/deleteOrder", {}, { withCredentials: true })
      .then((response) => {
        setCesta([]);
        console.log("Borrada");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const handleOpenModal = (id) => {
    setId(id)
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const intl = useIntl();

  useEffect(() => {
     axios
      .post(
        "http://localhost:5000/getProducts",
        {
          
        },
        { withCredentials: true }
      )
      .then((response) => {
       
                cestaCalculo(response.data);
        
      })
      .catch((error) => {});
  }, []);

  function deleteSingleProduct(id,comentarios){
     axios
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
     axios
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

  function cestaCalculo(data){
    setCesta(data)

    let totalCantidad = 0;
    let totalPrecio = 0;
    data.forEach(element => {
    totalCantidad += element.cantidad;
    totalPrecio += (element.precio*element.cantidad);
    });
    
    totalPrecio = (Math.trunc(totalPrecio * 100) / 100).toFixed(2)
  setCantidad(totalCantidad);
  setPrecio(totalPrecio);
  
  }

  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  const navigate = useNavigate();  // Crea la instancia de navigate


  function pagarCesta(){

    navigate('/compra'); // Aquí rediriges a la página protegida



  }

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <div className="w-11/12 xl:w-10/12 m-auto bg-amber-900 gap-2 flex justify-between ">
        <div className="bg-red-400   sticky  top-10 h-screen sm:flex hidden">
          {categoriasRecibidas ? (
            <div>
              {categories.map((element, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      String(activeCategory) === String(element.id)
                        ? "bg-white text-black font-bold"
                        : "text-black"
                    } p-2 w-45 xl:w-50 bg-amber-200 text-sm pt-4 pb-4 border-b border-white `}
                  >
                    {lang == "es" ? (
                      <div>{element.nombre_es}</div>
                    ) : (
                      <div>{element.nombre_en}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>otra</div>
          )}
        </div>

        <Modal
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
          closeTimeoutMS={300}
          contentLabel="Ejemplo Modal"
          className="modal-content w-11/12 md:w-xl px-12 pt-12 pb-6 flex flex-col"
          overlayClassName="modal-overlay"
          style={{ content: { height: "550px" } }}
        >
          <button
            className="absolute boton right-4 top-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
          ></button>
          <div className=" h-full  sm:mt-10">
            {comidas
              .filter((comida) => comida.id === id)
              .map((element, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-between h-full "
                  >
                    <div className="sm:flex sm:gap-3 ">
                      <div className='sm:min-w-34 sm:w-34 w-full justify-center items-center flex'>

                      <figure className="sm:min-w-34 sm:w-34 w-25 flex  ">
                        <img
                          className="rounded-md w-full sm:h-46 h-36 shadow-md  shadow-gray-600"
                          src={"/" + element.img}
                          alt={
                            lang == "es"
                              ? element.descripcion_es
                              : element.descripcion_en
                          }
                        ></img>
                      </figure>
                      </div>
                      <div className="flex flex-col sm:gap-4 gap-0  justify-center sm:mt-0 mt-5">
                        <div className="font-semibold">
                          {lang == "es" ? element.nombre_es : element.nombre_en}
                        </div>
                        <div className="text-lg">{element.precio} €</div>
                        <div className="text-sm sm:text-base">
                          {lang == "es"
                            ? element.descripcion_es
                            : element.descripcion_en}
                        </div>
                      </div>
                    </div>

                    <textarea
                      id="message"
                      rows="4"
                      className="block sm:p-2.5 p-1.5 w-full sm:mt-15 mt-2.5 text-sm bg-gray-50 
                  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                  text-dark
                     dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     onChange={(e) => setComentarios(e.target.value)}
                      placeholder={intl.formatMessage({
                        id: "catalogo_textarea",
                      })}
                    ></textarea>
                    <button
                    onClick={() => addProduct(element.id)}
                      className="mt-auto bg-emerald-100 text-teal-900 font-bold 
                      cursor-pointer w-full rounded-3xl pt-3 pb-3 hover:bg-emerald-200 duration-200"
                    >
                      <FormattedMessage id="catalogo_boton_confirmar" />
                    </button>
                  </div>
                );
              })}
          </div>
        </Modal>

        <div className="bg-blue-400 w-full">
          {comidasRecibidas ? (
            <div>
              {categories.map((categoria, index) => {
                return (
                  <div
                    className="grid grid-cols-1 lg:grid-cols-2  m-3 gap-3"
                    id={categoria.id}
                    key={index}
                  >
                    <div className="text-2xl w-full lg:col-span-2 bg-amber-700 mt-6 mb-3 ">
                      {lang == "es" ? (
                        <div>{categoria.nombre_es}</div>
                      ) : (
                        <div>{categoria.nombre_en}</div>
                      )}
                    </div>
                    {comidas
                      .filter((comida) => comida.categoria_id === categoria.id)
                      .map((comida, idx) => {
                        return (
                          <div
                            className="w-full bg-amber-100 cursor-pointer hover:scale-103 duration-250 border-1 p-2 rounded-sm"
                            key={idx}
                            onClick={() => handleOpenModal(comida.id)}
                          >
                            <div className="flex gap-2">
                              <figure className="min-w-25 w-25">
                                <img
                                  className="rounded-md w-full h-32 shadow-md  shadow-gray-600"
                                  src={"/" + comida.img}
                                  alt={
                                    lang == "es"
                                      ? comida.descripcion_es
                                      : comida.descripcion_en
                                  }
                                ></img>
                              </figure>

                              <div className="flex flex-col">
                                <div>
                                  {lang == "es" ? (
                                    <div className="font-bold">
                                      {comida.nombre_es}
                                    </div>
                                  ) : (
                                    <div className="font-bold">
                                      {comida.nombre_en}
                                    </div>
                                  )}
                                  {lang == "es" ? (
                                    <div className="font-normal text-gray-900">
                                      {comida.descripcion_es}
                                    </div>
                                  ) : (
                                    <div className="font-normal text-gray-900">
                                      {comida.descripcion_en}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <div>{comida.precio} €</div>

                              <button className="border-2 border-teal-200 rounded-2xl p-1 cursor-pointer">
                                <Plus
                                  size={18}
                                  color={"#98fbfa"}
                                  strokeWidth={"5px"}
                                />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="hidden 2xl:flex min-w-80 max-w-80  flex-col">
          <div className="bg-white rounded-xl flex flex-col sticky top-10  p-5">
            <div className="w-full  flex justify-center mt-8 text-xl font-bold">
              <FormattedMessage id="catalogo_tu_pedido" />
            </div>
            {cesta.length > 0 ? (
              <div>
              <div className='pt-5  min-h-50 max-h-90 overflow-auto'>
                {cesta.map((element, index) => {
                  return (
                    <div key={index}>
                      <div className="flex justify-between">
                        <div>{element.cantidad}x</div>
                        <div>
                          {lang == "es" ? element.nombre_es : element.nombre_en}
                        </div>
                        <div>{(Math.trunc(element.precio * element.cantidad * 100) / 100).toFixed(2)} €</div>
                      </div>
                      { element.comentarios.length > 0 ? (
                       <div className='flex'>
                        <Dot color='#969696' className='shrink-0'/><div className='text-gray-700 text-sm'>{element.comentarios}</div>
                      </div>
                      ):(
                        null
                      )

                      }
                      <div className='flex mt-1 mb-3 justify-between'>
                        <div className='bg-[#ECF8F5] p-1 rounded-2xl'>
                        <Minus 
                        size={15} 
                        color="#2ABB9B"
                        onClick={() => deleteSingleProduct(element.id,element.comentarios)}
                        />
                        </div>
                        <div className='bg-[#ECF8F5] p-1 rounded-2xl'>
                        <Plus 
                        size={15} 
                        color="#2ABB9B"
                        onClick={() => addSingleProduct(element.id,element.comentarios)}

                        />
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              </div>
                 <button  
             onClick={() => pagarCesta()}
            className='mt-5 bg-emerald-100 text-teal-900 font-bold 
            cursor-pointer w-full rounded-3xl pt-3  pb-3 hover:bg-emerald-200 duration-200'>
                {lang=='es' ? (
                  <>Pide {cantidad} por {precio} €</>
                ):(
                  <>Order {cantidad} for {precio} €</>
                )}
          </button>
              </div>
            ) : (
              <>
                <div className="flex justify-center mt-5 opacity-65">
                  <figure className="w-45">
                    <img
                      className="w-full h-full object-cover"
                      src="/astronauta.webp"
                    ></img>
                  </figure>
                </div>
                <div className=" text-center mb-5 mt-8 text-base font-semibold text-pretty">
                  <FormattedMessage id="catalogo_tu_pedido_info" />
                </div>
              </>
            )}
            
          </div>

          
        </div>
      </div>
    </IntlProvider>
  );
}

export default Catalogo;
