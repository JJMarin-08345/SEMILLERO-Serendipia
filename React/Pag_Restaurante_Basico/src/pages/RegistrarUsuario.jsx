import { useState } from 'react';
import axios from 'axios';
import './styles/RegistrarUsuario.css';

export default function RegistrarUsuario() {
    const [datosUser, setDatosUser] = useState({
        Nombre: '',
        TipoUsuario: 2
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realiza una solicitud POST al servidor
            console.log("enviando", datosUser.Nombre, datosUser.TipoUsuario);
            const newMesero = await axios.post('http://localhost:3001/POST/Usuario', datosUser);
            console.log(newMesero.data);
            console.log(newMesero.status);
            // setDatosUser({ nombre: '', tipoUsuario: 2 });
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    };

    return (
        <div>
            <form onSubmit={(ev) => handleSubmit(ev)}>
                <h2>Formulario</h2>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        onChange={(ev) => setDatosUser({...datosUser, Nombre: ev.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="tipo">Tipo:</label>
                    <select
                        id="tipo"
                        name="tipo"
                        defaultValue={2}
                        onChange={(ev) => {
                            console.log(ev.target.value);
                            setDatosUser({...datosUser,  TipoUsuario: ev.target.value})}
                        }
                    >
                        <option value={2}>Mesero</option>
                        <option value={1}>Admin</option>
                    </select>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
