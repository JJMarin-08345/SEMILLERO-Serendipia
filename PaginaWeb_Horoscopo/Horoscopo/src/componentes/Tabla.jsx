//Componente encargado de realizar una tabla para nuestros usuarios y que el administrador lo manipule
import "./Tabla.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUsuario, getUsuarios } from "../api/UsuariosAPI";

// const Usuarios = Data_Usuarios;

export function Tabla() {
    //Vamos a empezar aqui a llamar a la api por medio de react-query
    //Creamos variable que use el hook useQuery
    const {isLoading, data: Usuarios, isError, error} = useQuery({
        queryKey: ['Data_Usuarios'],//Para que se guarde en memoria cache, siempre debe ir entre llaves
        queryFn: getUsuarios
    });
    //isLoading, para saber si la consulta esta cargando, data los datos
    //isError si el servidor respondio con error y es un boolean, si falla false, sino true
    //error es para ver el error

    const queryClient = useQueryClient();

    // Borrar un usuario
    const delUserMutation = useMutation({
        mutationFn: deleteUsuario,
        onSuccess: ()=>{
            queryClient.invalidateQueries('Data_Usuarios');
        },
        onError: ()=>{alert("No fue posible eliminar");}
    })

    if(isLoading) return <div>Cargando</div>
    else if(isError) return <div>Error: {error.message} </div>
    return (
        
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Clave</th>
                </tr>
            </thead>
            <tbody>
                {Usuarios.map(usuarios => (
                    <tr key={usuarios.id}>
                        <td> {usuarios.nombre} </td>
                        <td> {usuarios.correo} </td>
                        <td> {usuarios.clave} </td>
                        <td>  
                            <Link to={`/User/${usuarios.id}`} className="Link"> Editar </Link>
                            <button onClick={() => delUserMutation.mutate(usuarios.id) } className="Link"> Eliminar </button>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </table>
    );
}