import './styles/Login.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getMeseroCorreo } from '../API/RestauranteApi';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
  const { isAuthenticated, setIsAuthenticated, UserId, setUserId } = useAuth();

  const navigate = useNavigate();
  const [Usercorreo, setUserCorreo] = useState('');
  const [Userclave, setUserClave] = useState('');

  const Loggin = async () => {
    const BusMesero = await getMeseroCorreo(Usercorreo);
    const MeseroF = BusMesero[0];

    if (MeseroF) {
      if (MeseroF.correo === Usercorreo && MeseroF.clave === Userclave) {
        localStorage.setItem('User', JSON.stringify(MeseroF));
        setIsAuthenticated(true);
        setUserId(MeseroF.id);
        navigate(`/Mesero/${MeseroF.id}`);
      } else {
        alert("Usuario o Clave incorrectos");
      }
    } else {
      alert("Usuario o Clave incorrectos");
    }
  }

  if (isAuthenticated) {
    return <Navigate to={`Mesero/${UserId}`} />;
  } else {

    return (
      <div>
        <form className="formLogin" onSubmit={ev => {
          ev.preventDefault();
          Loggin();
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
          </div>
        </form>
      </div>
    )
  }
}
