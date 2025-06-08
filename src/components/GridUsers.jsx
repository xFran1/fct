import { useCallback, useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Eye, Plus, View } from "lucide-react";
import ModalUsers from "./ModalUsers";


ModuleRegistry.registerModules([AllCommunityModule]);





const GridUsers = ({users,lang}) => {
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
    console.log(users)
    if(users!=null){
        let id = 1;
        users.forEach((user) => {
            console.log(user)
            const fechaISO = user.createdAt;

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
                    Rol:user.rol,
                    Username: user.username,
                    Email: user.email,
                    Fecha: fechaFormateada,
                    id:user.id,
                    // Pedido: "Ver mas"
                    
                });
                id++;
           
        });
        
    }
     setRowData(rows);

  }, [users]);

  const [colDefs,setColDefs] = useState([]);

    

   useEffect(() => {
    setColDefs([
      { field: "ID", headerName: lang === 'es' ? "ID" : "ID" },
      { field: "Rol", headerName: "Rol" },
      { field: "Username" },
      { field: "Email" },
      { field: "Fecha", headerName: lang === 'es' ? "Fecha de la cuenta" : "Acc Date" },
{
        headerName: "Info",
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
        <ModalUsers 
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

export default GridUsers;
