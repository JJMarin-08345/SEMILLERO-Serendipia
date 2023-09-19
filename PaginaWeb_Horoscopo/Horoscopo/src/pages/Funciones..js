import { Data_Usuarios } from "../Bd/bdUsuarios";

const Usuarios = Data_Usuarios;

//Funcion para buscar usuarios y retornarlos
export function buscarUsuarios(correo){
   const UsuarioEncontrado = Usuarios.find((usuario) => usuario.correo === correo);
   if(UsuarioEncontrado){
    console.log("Sus datos son: "+
        UsuarioEncontrado.nombre + " " +
        UsuarioEncontrado.correo + " " +
        UsuarioEncontrado.clave);
   }else{
    console.log("No encontré al usuario");
   }
   return UsuarioEncontrado || null;
}