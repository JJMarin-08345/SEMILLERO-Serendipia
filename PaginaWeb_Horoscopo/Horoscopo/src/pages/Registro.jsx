import { Boton } from "../componentes/Boton";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createUsuario, getUsuarios } from "../api/UsuariosAPI";
import { useMutation } from "@tanstack/react-query";

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
}


export default function Registro() {
    const {isLoading, data: Usuarios, isError, error} = useQuery({
        queryKey: ["Data_Usuarios"],
        queryFn: getUsuarios
    });

    if(isLoading) return <div>Trayendo Datos</div>
    else if (isError) return alert("Error: "+error.message)


    return (
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
    )
}