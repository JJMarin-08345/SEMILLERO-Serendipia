import './styles/Mesero.css';
import '../image/Icons/mesita/style.css';
import Tabla from '../components/Tabla';
import { useQuery } from '@tanstack/react-query';
import { getMesasXMesero, getMeseroId } from '../API/RestauranteApi';
import { useAuth } from '../auth/AuthProvider';import Carrusel from '../components/Carrusel';
;

export default function Mesero() {

  localStorage.removeItem("Mesa");

  const { UserId: MsroId } = useAuth();

  const { isLoading, data: Mesas, isError, error } = useQuery({
    queryKey: ['Mesas', MsroId],
    queryFn: () => getMesasXMesero(MsroId)
  })

  const { data: MeseroObtendido } = useQuery({
    queryKey: ['Meseros', MsroId],
    queryFn: () => getMeseroId(MsroId)
  })


  if (isLoading) return <div> Cargando informacion </div>
  else if (isError) return <div> Error: {error} </div>

  return (
    <div>
      
      <Carrusel Mesas={Mesas}/>

      <form className="formMesero">
        <h2 className="Linealh2" data-after-content={MeseroObtendido && MeseroObtendido.Nombre}> Mesero: </h2>
        <label className="lblMesas">Mesas
          <br />   Asignadas: </label>
        <input className="input-mesas" defaultValue={Mesas.length} readOnly />

        <Tabla Titulo={"Mesa a Cargo:"} Th1={"N°Mesa"} Th2={"Cantidad Clientes"} Th3={"Ocupada"}
          TextoBoton={"Tomar Pedido"} Mesas={Mesas} 
        />
      </form>
    </div>
  )
}
