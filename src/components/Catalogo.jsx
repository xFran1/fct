import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

function Catalogo({ lang }) {
  const [categories, setCategories] = useState([]);
  const [categoriasRecibidas, setCategoriasRecibidas] = useState([false]);

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
  const [comidasRecibidas, setComidasRecibidos] = useState([false]);

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

  function addProduct(id) {
    // console.log(id)
    axios
      .post("http://localhost:5000/addProduct", {
        id:id
      }, 
      { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {

      });
  }

  return (
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
                          onClick={() => addProduct(comida.id)}
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

                            <button className="border-2 border-teal-200 rounded-2xl p-1">
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
      <div className="hidden xl:flex w-100  flex-col">
        <div className="bg-white rounded-xl rounded-b-none p-5">
          <div className="w-full flex justify-center mt-8 text-xl font-bold">
            <FormattedMessage id="catalogo_tu_pedido" />
          </div>
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
        </div>

        <div className="bg-white rounded-xl mt-1 rounded-t-none">
          <div className="w-full flex justify-center mt-8 text-sm "></div>
        </div>
      </div>
    </div>
  );
}

export default Catalogo;
