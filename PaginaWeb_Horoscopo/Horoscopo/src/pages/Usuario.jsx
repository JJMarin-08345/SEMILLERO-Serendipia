import { getUsuariosId, updateUsuario } from "../api/UsuariosAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Boton } from "../componentes/Boton";
import { Inputs } from "../componentes/Inputs";
import '../App.css';

export default function Usuario() {
    const navigate = useNavigate();
    const { userId } = useParams(); /*Para capturar el id de la URL usamos este useParams() y le indicamos como 
    se llama el parametro en la ruta dinamica, en nuestro caso se llama userId (Ir a main.jsx y buscar ese path), y captura el numerito, 
    que es enviado desde el componente Tabla, en el Link y le pasamos el usuarios.id */

    const { isLoading, data: UsuarioFind, isError, error } = useQuery({
        queryKey: ['Data_Usuarios', userId],
        queryFn: () => getUsuariosId(userId)//Asi para llamarla como función
    });
    
    const [newNombre, setNewNombre] = useState(UsuarioFind && UsuarioFind.nombre);
    const [newCorreo, setNewCorreo] = useState(UsuarioFind && UsuarioFind.correo);
    /*La expresión UsuarioFind && UsuarioFind.nombre es una forma de realizar una comprobación condicional en JavaScript. 
    Lo que hace es verificar si UsuarioFind existe (no es undefined o null) antes de intentar acceder a su propiedad nombre. 
    Esto es útil para evitar errores si UsuarioFind es undefined. */

    const queryClient = useQueryClient();
    const actualizarUsuario = useMutation({
        mutationFn: updateUsuario,
        onSuccess: ()=>{
            queryClient.invalidateQueries('Data_Usuarios');
            alert("Modificado con exito");
            navigate("/Admin");
        }
    })

    const ActualizarDatos = (nombreNuevo,correoNuevo) =>{
        let UpUsuario = {
            id: userId,
            nombre: nombreNuevo,
            correo: correoNuevo,
            clave: UsuarioFind.clave
        }
        return UpUsuario;
    }

    if (isLoading) {
        return <div>Cargando Información...</div>
    } else if (isError) { return <div> Error: {error.message} </div> }

    return (

        <>
            <div className="form">
                <h2>Detalles: {UsuarioFind.nombre} </h2>
                <form className="antes" onSubmit={ev => {
                    ev.preventDefault();
                    actualizarUsuario.mutate(ActualizarDatos(newNombre,newCorreo))
                    }}
                >
                    <Inputs textoLabel="Nombre" className="newNombre" defaultValue={UsuarioFind.nombre}
                        onChange={ev => setNewNombre(ev.target.value)}
                    />
                    <Inputs textoLabel="Correo" className="newCorreo" defaultValue={UsuarioFind.correo}
                        onChange={ev => setNewCorreo(ev.target.value)}
                    />
                    <Boton texto={"Actualizar"} />
                </form>
                <Link to={("/Admin")}>
                    <Boton texto={"Regresar"} />
                </Link>
            </div >
        </>
    )
}
