//Vamos a crear el componente boton 
import './Boton.css'

export function Boton({texto}) {
  return (
    <button className='button'> 
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {texto} 
    </button>
  )
}
