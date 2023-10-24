import { Link } from 'react-router-dom';
import './styles/Login.css';

export default function Login() {
  return (
    <div>
        <form className="formLogin" onSubmit={ev => {
          ev.preventDefault();
        }
        }>
          <div className="circle">
            <i className="fas fa-user"></i>
          </div>
          
          <h2 className="Linealh2"> Iniciar Sesión </h2>

          <div className="user-box">
            <input defaultValue={"@restaurante.com"}
              className='Usercorreo' required type='text' onChange={ev => setUserCorreo(ev.target.value)} />
            <label>  Usuario </label>
          </div>

          <div className='user-box'>
            <input className='Userclave' required type='password' onChange={ev => setUserClave(ev.target.value)} />
            <label> Contraseña </label>
          </div>
          <div className="botonCen">
            <button className="btnFormularios"> Iniciar Sesión </button>
            <br/><Link className='Link-login' to={"/RegistrarUsuario"}> ¿Aún no estás registrado? </Link>
          </div>
        </form>
      </div>

  )
}
