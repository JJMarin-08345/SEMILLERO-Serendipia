import { Boton } from "../componentes/Boton";
import { Link } from "react-router-dom";
import '../App.css';

export const Usuarios = [
    {
        id: 0,
        nombre: "Juan Jose",
        correo: "juanjo@gmail.com",
        clave: "clave123"
    },
    {
        id: 1,
        nombre: "Sofia Geraldine",
        correo: "sofipz@hotmail.com",
        clave: "sofia123"
    },
    {
        id: 2,
        nombre: "Carlos Arturo",
        correo: "carlosAro@hotmail.com",
        clave: "carlos456"
    },
    {
        id: 3,
        nombre: "Felipe Castañeda",
        clave: "felipe231"
    }
]

// console.log(ultimoUsuario)
// console.log("Registrao con exito "+ Usuarios.correo);


export function registroUsuario(nombre, correo, clave) {
    const ultimoUsuario = Usuarios[(Usuarios.length -1)].id;
    Usuarios.push({
        id: (ultimoUsuario+1),
        nombre: nombre,
        correo: correo,
        clave: clave
    });

    for (var i = 0; i < Usuarios.length; i++) {
        console.log(Usuarios[i]);
    }
    localStorage.setItem("usuariosRegistraos", JSON.stringify(Usuarios))
}

export default function Registro() {
    return (
        <>
        <div>
            <h1>Usuarios: </h1>
            {Usuarios.map(users => (
                <div key = {users.id}>
                    <h2>{users.nombre}</h2>
                </div>
                )
            )}
            <Link to={("/")}>
                <Boton texto={"Regresar"} /> 
            </Link>
        </div>
        </>
    )
}