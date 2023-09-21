import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Correo, Clave } from './pages/Admin.jsx';
import { buscarUsuarios } from './pages/Funciones.';
import { Boton } from './componentes/Boton';
import { useMutation } from '@tanstack/react-query';
import { createUsuario } from './api/UsuariosAPI';
import { Inputs } from './componentes/Inputs';

//Creamos un componente
export default function App() {
  const navigate = useNavigate();
  //Variable usada para redireccionar automáticamente en caso de que se cumpla un registro
  const [Registrado, setRegistrado] = useState(false);
  //iniciamos en false ya que si no tiene una cuenta, este se ira al formulario de registro y viceversa

  const addUsusario = useMutation({
    mutationFn: createUsuario
  })


  const formRegistro = Registrado ? 'login-form' : 'register-form';
  const formInicio = Registrado ? 'register-form-anima' : 'login-form';

  //Variables para logeo y registro
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [nombre, setNombre] = useState('');

  // const errorCorreo = ValidarCampos(correo) ? 'correoBien' : 'errorCorreo';

  const handleClick = () => {
    setRegistrado(!Registrado);
    setNombre('');
    setCorreo('');
    setClave('');
  }

  //Funcion que se encarga de verificar el correo y la clave 
  const login = async (correo, clave) => {
    UsuarioLogeo = await buscarUsuarios(correo);
    // console.log(correo+" "+" ")
    if (UsuarioLogeo !== null && ValidarCampos(correo)) {
      if (correo === UsuarioLogeo.correo && clave === UsuarioLogeo.clave) {
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

  //Funcion para saber que se logeo como usuario y lo rediriga a la pagina usuario
  const LogginLikeUser = (nombreU, correoU, claveU) => {
    if (Registrado) {
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
      else if (login(correo, clave)) {
        navigate("/User")
      }
    }
  }
  //Codigo html y jsx 
  return (
    <>
      <div className="form">
        <form className={formRegistro}
          onSubmit={ev => {
            ev.preventDefault();
            LogginLikeUser(nombre, correo, clave);
          }}
        >
          <h2> Registro </h2>
          <Inputs className="nombre" TituloFormulario="Login" textoLabel="Nombre" type="text" required value={nombre}
            onChange={ev => setNombre(ev.target.value)} />

          <Inputs className="correo" textoLabel="Correo" type="email" required value={correo}
            onChange={ev => setCorreo(ev.target.value)} />
          {/* <span className={errorCorreo}>Correo Incorrecto</span> */}

          <Inputs className="clave" textoLabel="Contraseña" type="password" required value={clave}
            onChange={ev => setClave(ev.target.value)} />


          <Boton texto={"Registrarse"} />
          <p className="message">Ya esta registrado?
            <a href='#' onClick={handleClick}> Inicia Sesión</a>
          </p>
        </form>


        <form className={formInicio}
          onSubmit={ev => {
            ev.preventDefault();
            LogginLikeUser("", correo, clave);
          }}
        >
          <h2> Inicio Sesión </h2>

          <Inputs className="correo" textoLabel="Correo" type="email" required value={correo}
            onChange={ev => setCorreo(ev.target.value)} />
          {/* <span className={errorCorreo}>Correo Incorrecto</span> */}

          <Inputs className="clave" textoLabel="Contraseña" type="password" required value={clave}
            onChange={ev => setClave(ev.target.value)} />

          <Boton texto={"Iniciar Sesión"} />
          <p className="message">No está registrado?
            <a href='#' onClick={handleClick}> Create una cuenta  </a>
          </p>
        </form>
      </div>
    </>
  )
}

//Funcion de validación de campos
const ValidarCampos = (correo) => {
  return correo.includes('@') && correo.includes('.');
  //false = contiene numeros
}