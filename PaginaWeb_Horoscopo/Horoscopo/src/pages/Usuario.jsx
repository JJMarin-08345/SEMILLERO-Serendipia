import { getUsuariosId } from "../api/UsuariosAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import '../App.css';
import { Boton } from "../componentes/Boton";
import { Inputs } from "../componentes/Inputs";


export default function Usuario() {
    const { userId } = useParams(); /*Para capturar el id de la URL usamos este useParams() y le indicamos como 
    se llama el parametro en la ruta dinamica, en nuestro caso se llama userId, y captura el numerito, que es enviado
    desde el componente Tabla, en el Link y le pasamos el usuarios.id */

    const { isLoading, data: UsuarioFind, isError, error } = useQuery({
        queryKey: ['Data_Usuarios', userId],
        queryFn: () => getUsuariosId(userId)//Asi para llamarla como función
    });

    if (isLoading) {
        return <div>Cargando Información...</div>
    } else if (isError) { return <div> Error: {error.message} </div> }

    // const [newNombre, setNewNombre] = useState(''); 
    // const [newCorreo, setNewCorreo] = useState('');

    return (
        <>
        <div className="form">
            <h2>Login</h2>
            <form>
                <Inputs textoLabel="Correo" className="correo" defaultValue={UsuarioFind.correo} readonly/>
                <Boton texto={"Actualizar"}/>
            </form>
        </div>
        </>
    )
}
