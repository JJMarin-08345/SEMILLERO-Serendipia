import { Boton } from "../componentes/Boton";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsuarios } from "../api/UsuariosAPI";

// console.log(ultimoUsuario)
// console.log("Registrao con exito "+ Usuarios.correo);

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