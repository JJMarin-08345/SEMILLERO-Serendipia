import axios from 'axios';
//axios es una libreria para manejar los metodos CRUD
const UsuariosApi = axios.create({
    baseURL: 'http://localhost:3000/Data_Usuarios'
})


//GetUsuarios obtener todos los usuarios
export const getUsuarios = async () => {
    const respuesta = await UsuariosApi.get('/');
    return respuesta.data;
}
//Estructura OBLIGATORIA, debe ser así, con su async, su await, y su return variableDeRespuesta.data

//GetUsuariosId obtener usuarios por id
export const getUsuariosId = async (id) => {
    const respuesta = await UsuariosApi.get(`/${id}`);
    return respuesta.data;
}

//GetUsuariosCorreo obtener usuarios por Correo
export const getUsuariosCorreo = async (correo) => {
    const respuesta = await UsuariosApi.get(`?correo=${correo}`);
    return respuesta.data;
}

//CreateUsuarios
export const createUsuario = (newUser) =>{
    UsuariosApi.post('/',newUser)
}

//DeleteUsuarios
export const deleteUsuario = (id) => UsuariosApi.delete( `/${id}` );

//UpdateUsuarios
export const updateUsuario = (upUser) => UsuariosApi.put(`/${upUser.id}`, upUser)
