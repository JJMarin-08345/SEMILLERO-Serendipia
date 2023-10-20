import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";

/*Esta función es para cuando se quiera proteger una ruta con un auth que es la abrevación de authentication
y dice que si el auth es diferente de null, entonces redirija al componente hijo que está dentro de el*/
export const ProtectedRoute = ({redirectTo='/'}) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet/> : <Navigate to={redirectTo}/>
}

















// /*Esta función es para las rutas protegidas y para si hay algún parámetro que se capture en el id o algo, este se capture 
// y se pueda usar para comparar si ese dato es igual al del localStorage y demás*/
// export const ProtectedRouteParam = ({children,redirectTo="/", redirectLogged, paramURL, propyLs}) => {
//     const param = +useParams()[paramURL];
//     const auth = useAuth();
//     // Capturamos el parametro que necesitemos o algo, para luego así mismo, realizar la función 
//     /*El [paramURL] y el [propyLs] se usa para pasarle como si fuera la propiedad a la que vamos a 
//     acceder, es decir, en el useParams es como si hicieramos useParams().paramURL, es decir, acceder
//     a la propiedad del URL, pero ps lo hacemos con corchetes [] y justo despues del tin, lo ponemos*/
//     if(auth.isAuthenticated){
//         return <Navigate to={redirectTo} />
//     }
// // }else{
// //     try{
// //         if(auth[propyLs] === param ){
// //             /* El propyLs, es lo mismo que dije arribita, es para acceder a una propiedad, la cosa es que
// //             esta propiedad, se la pasamos como  parametro en la función */
// //             return children;
// //         }
// //     }catch{
// //         null
// //     }
// }


