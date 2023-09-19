import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Correo, Clave } from './pages/Admin.jsx';
import { buscarUsuarios } from './pages/Funciones.';
import { Boton } from './componentes/Boton';
import { useMutation } from '@tanstack/react-query';
import { createUsuario } from './api/UsuariosAPI';

//Creamos un componente
export default function App() {
  const navigate = useNavigate();
  //Variable usada para redireccionar automáticamente en caso de que se cumpla un registro
  const [Registrado, setRegistrado] = useState(false);
  //iniciamos en false ya que si no tiene una cuenta, este se ira al formulario de registro y viceversa

  //Funcion para limpiar campos
  const ClearInputs = () => {
    setNombre('');
    setCorreo('');
    setClave('');
  }
  
  const addUsusario = useMutation({
    mutationFn: createUsuario
    // onSuccess: () => {
    //     console.log("Agregado")
    // }
  })


  const handleClick = () => {
    setRegistrado(!Registrado);
    ClearInputs();
    //hola
    // console.log(Registrado) 
  }

  const formRegistro = Registrado ? 'login-form' : 'register-form';
  const formInicio = Registrado ? 'register-form-anima' : 'login-form';

  //Variables para logeo y registro
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');

  const errorCorreo = ValidarCampos(correo) ? 'correoBien' : 'errorCorreo';

  //Funcion para saber que se logeo como usuario y lo rediriga a la pagina usuario
  const LogginLikeUser = (nombreU, correoU, claveU) => {
    if(Registrado) {
      let newUser = {
        nombre: nombreU,
        correo: correoU,
        clave: claveU
      }
      addUsusario.mutate(newUser);
      navigate("/User");
    } else {
      if (correo === Correo && clave === Clave) {
        alert("Logeado como Administrador");
        navigate("/Admin")
      }
      else if(login(correo,clave)) { 
        navigate("/User")
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
              LogginLikeUser(nombre,correo, clave);
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

            <Boton texto={"Registrarse"} />
            <p className="message">Ya esta registrado?
              <a href='#' onClick={handleClick}> Inicia Sesión</a>
            </p>
          </form>


          <form className={formInicio}
            onSubmit={ev => {
              ev.preventDefault();
              LogginLikeUser("",correo, clave);
            }}
          >
            <input className="correo" value={correo} type="text" minLength="9" maxLength="50" placeholder="correo electrónico" required
              onChange={ev => setCorreo(ev.target.value)}
            />
              <span className={errorCorreo}>Correo Incorrecto</span>

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
  let Usuario = buscarUsuarios(correo)
  // console.log(correo+" "+" ")
  if (Usuario !== null && ValidarCampos(correo)) {
    if (correo === Usuario.correo && clave === Usuario.clave) {
      alert("Logeo para usuario concedido");
      return true;
    } else {
      alert("usuario o contraseña incorrectos");
    }
  } else {
    alert("El usuario no existe");
  }
  return false
}

//Funcion de validación de campos
const ValidarCampos = (correo) => {
  return correo.includes('@') && correo.includes('.');
  //false = contiene numeros
}