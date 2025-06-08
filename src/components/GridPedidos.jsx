import { useCallback, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Eye, Plus, View } from "lucide-react";
import ModalProductosOrder from "./ModalProductosOrder";


ModuleRegistry.registerModules([AllCommunityModule]);





const GridPedidos = ({pedidos,lang}) => {
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null); // Para pasar datos al modal

  


  const abrirModal = (data) => {
    setPedidoSeleccionado(data);  // Guardas la fila seleccionada
    setIsModalOpen(true);         // Abres el modal
  };

  const BotonVerMas = (props) => {
    return (
      <button
        className='cursor-pointer flex justify-center items-center w-full h-full' 
        onClick={() => abrirModal(props.data)}
      >
        <Eye size={16} />
      </button>
    );
  };

  useEffect(() => {
    const rows = [];
    console.log(pedidos)
    if(pedidos!=null){
        let id = 1;
        pedidos.forEach((pedidoUnitario) => {
            const fechaISO = pedidoUnitario.pedido.createdAt;

            // Convertir a objeto Date
            const fecha = new Date(fechaISO);

            // Opciones para formato fecha y hora en España
            const opciones = {
            timeZone: 'Europe/Madrid', // zona horaria España
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            };

            const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fecha);

                rows.push({
                    ID: id,    
                    Estado: pedidoUnitario.pedido.estado,
                    Precio_total: pedidoUnitario.pedido.total+" €",
                    Fecha: fechaFormateada,
                    productos:pedidoUnitario.productos
                    // Pedido: "Ver mas"
                    
                });
                id++;
           
        });
        
    }
     setRowData(rows);

  }, [pedidos]);

  const [colDefs,setColDefs] = useState([]);

    

   useEffect(() => {
    setColDefs([
      { field: "ID", headerName: lang === 'es' ? "ID" : "ID" },
      { field: "Estado", headerName: lang === 'es' ? "Estado" : "Status" },
      { field: "Precio_total", headerName: lang === 'es' ? "Precio total" : "Total price" },
      { field: "Fecha", headerName: lang === 'es' ? "Fecha del pedido" : "Order date" },
{
        headerName: lang === 'es' ? "Pedido" : "Order",
        field: "Pedido",
        cellRenderer: BotonVerMas,
        cellRendererParams: { lang },

        sortable: false,
        filter: false,
        maxWidth: 120,
        flex: 1,
      },      
    ]);
  }, [lang]);

  return (
    <div>
        <ModalProductosOrder 
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        data={pedidoSeleccionado}
        lang={lang}
        />
    <div style={{ height: 500  }} >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        popupParent={document.getElementById("modal-root")}
        localeText={lang === 'es' ? { noRowsToShow: 'No hay filas para mostrar' } : {}}
        defaultColDef={{
            flex: 1,
            sortable: true,
            resizable: true
        }}
        key={lang}
        />
    </div>
        </div>
  );
};

export default GridPedidos;
