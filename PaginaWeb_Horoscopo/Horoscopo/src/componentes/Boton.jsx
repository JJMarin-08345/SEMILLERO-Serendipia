//Vamos a crear el componente boton 
import './Boton.css'

export function Boton({texto}) {
  return (
    <button className='button'> {texto} </button>
  )
}
