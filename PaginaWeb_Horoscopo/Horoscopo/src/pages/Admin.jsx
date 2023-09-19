/*Vamos a usar esto para crear al administrador y también vamos a exportar
las variables correo y contraseña*/

import { Tabla } from "../componentes/Tabla";

export const Correo = 'administrador@hotmail.com';
export const Clave = 'adminPage';


export default function Admin() {
    return (
      <Tabla/>
    );
}