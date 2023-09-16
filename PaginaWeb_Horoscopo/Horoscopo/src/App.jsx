import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Correo, Clave } from './pages/Admin.jsx';
import { registroUsuario } from './pages/Registro';
import { buscarUsuarios } from './pages/Funciones.';
import { Boton } from './componentes/Boton';

//Creamos un componente
function App() {
  const navigate = useNavigate();
  //Variable usada para redireccionar automáticamente en caso de que se cumpla un registro
  const [Registrado, setRegistrado] = useState(false);
  //iniciamos en false ya que si no tiene una cuenta, este se ira al formulario de registro y viceversa

  const handleClick = () => {
    setRegistrado(!Registrado);
    setNombre('');
    setCorreo('');
    setClave('');
    //hola
    //console.log(Registrado) 
  }

  const formRegistro = Registrado ? 'login-form' : 'register-form';
  const formInicio = Registrado ? 'register-form-anima' : 'login-form';

  //Variables para logeo y registro
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');

  const errorCorreo =  ValidarCampos(correo) ? 'correoBien' : 'errorCorreo';
  
  //Funcion para saber que se logeo como usuario y lo rediriga a la pagina usuario
  const LogginLikeUser = (nombreU,correoU,claveU,AdminUser) => {
    if(ValidarCampos(correoU)){
      if(!AdminUser){
        registroUsuario(nombreU,correoU,claveU);
        navigate("/User");
      }else{
        if(login(correo,clave)){
          navigate("/Admin");
        }else{
          navigate("/User")
        }
      }
    }
  }
  //Codigo html y jsx 
  return (
    <>
    <div className="login-page">
      <div className="form">
        <form className={formRegistro}
          onSubmit={ev => {
            ev.preventDefault();
            LogginLikeUser(nombre,correo,clave,false);
          }}
        >
          <input className='nombre' type="text" placeholder="nombre" required
            onChange={ev => setNombre(ev.target.value)}
          />

          <input className="correo" value={correo} type="text" minLength="9" maxLength="50" placeholder="correo electrónico" required
            onChange={ev => setCorreo(ev.target.value)}
          />
          <span className={errorCorreo}>Correo Incorrecto</span>

          <input className="clave" value={clave} type="password" placeholder="contraseña" required
            onChange={ev => setClave(ev.target.value)}
          />

          <Boton texto={"Registrarse"}/>
          <p className="message">Ya esta registrado?
            <a href='#' onClick={handleClick}> Inicia Sesión</a>
          </p>
        </form>


        <form className={formInicio}
          onSubmit={ev => {
            ev.preventDefault();
            LogginLikeUser("",correo,clave,true);
          }}
        >
          <input className="correo" value={correo} type="text" minLength="9" maxLength="50" placeholder="correo electrónico" required
            onChange={ev => setCorreo(ev.target.value)}
          />

          <input className="clave" value={clave} type="password" placeholder="contraseña" required
            onChange={ev => setClave(ev.target.value)}
          />

          <Boton texto={"Iniciar Sesión"} />
          <p className="message">No está registrado?
            <a href='#' onClick={handleClick}> Create una cuenta  </a>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}
//Funcion que se encarga de verificar el correo y la clave 
const login = (correo, clave) => {
  if (correo === Correo && clave === Clave) {
    alert("Logeado como Administrador") 
    return true;
  }
  let Usuario = buscarUsuarios(correo)
  // console.log(correo+" "+" ")
  if(Usuario!==null){
    if(correo === Usuario.correo && clave === Usuario.clave){
      alert("Logeo para usuario concedido")
    }else{
        alert("usuario o contraseña incorrectos")
      }
  }else{
    alert("El usuario no existe")
  }
  return false
}

//Funcion de validación de campos
const ValidarCampos = (correo) => {
  return correo.includes('@') && correo.includes('.');
  //false = contiene numeros
}



//Exportamos el componente y lo usamos en el main.jsx
export default App