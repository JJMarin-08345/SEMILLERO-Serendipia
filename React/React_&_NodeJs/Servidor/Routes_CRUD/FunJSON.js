const fs = require('fs');
//Usado para leer archivos
const path = require('path');

const DBRestaurante = path.resolve(__dirname,'../db/Datos.json');

//Función para leer un archivo en JSON
function leerBDJSON(){
    try {
        const DBJson = fs.readFileSync(DBRestaurante,'utf-8');
        return JSON.parse(DBJson);
    } catch (error) {
        console.log("Error al leer el archivo JSON ", error);
        return [];
    }
}

function actualizarBDJSON(newDatos) {
    try {
        fs.writeFileSync(DBRestaurante, JSON.stringify(newDatos,null,2), 'utf-8');
    } catch (error) {
        console.log("Error al actualizar el archivo ", error);
    }
}

module.exports = {leerBDJSON, actualizarBDJSON};