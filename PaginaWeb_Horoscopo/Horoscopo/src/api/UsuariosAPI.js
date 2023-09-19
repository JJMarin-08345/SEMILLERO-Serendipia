import axios from 'axios';
//axios es una libreria para manejar los metodos CRUD
const UsuariosApi = axios.create({
    baseURL: 'http://localhost:3000/Data_Usuarios'
})

//GetUsuarios
export const getUsuarios = async () => {
    const respuesta = await UsuariosApi.get('/');
    return respuesta.data;
}
//Estructura OBLIGATORIA, debe ser así, con su async, su await, y su return variableDeRespuesta.data

//CreateUsuarios
export const createUsuario = (newUser) =>{
    UsuariosApi.post('/',newUser)
}

//DeleteUsuarios
export const deleteUsuario = (id) => UsuariosApi.delete( `/${id}` );

//UpdateUsuarios
export const updateUsuario = (upUser) => UsuariosApi.put(`/${upUser.id}`, upUser)
