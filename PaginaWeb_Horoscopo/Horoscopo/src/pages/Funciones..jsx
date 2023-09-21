import { useQuery } from "@tanstack/react-query";
import { getUsuariosCorreo } from "../api/UsuariosAPI";

//Funcion para buscar usuarios y retornarlos
export async function buscarUsuarios(correo){

   const {isLoading, data:UsuarioFind, isError, error} = useQuery({
      queryKey: ["Data_Usuarios", correo],
      queryFn: ()=>getUsuariosCorreo(correo)
   });

   if(UsuarioFind !== null){
    console.log("Sus datos son: "+
        UsuarioFind.nombre + " " +
        UsuarioFind.correo + " " +
        UsuarioFind.clave);
   }else{
    console.log("No encontré al usuario");
   }
   return UsuarioFind || null;
}