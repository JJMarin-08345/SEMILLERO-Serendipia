const express = require('express');
const { leerBDJSON, actualizarBDJSON } = require('./FunJSON');
const router = express.Router();

router.delete("/Usuarios/:idUsuario", (req, res) => {
    const idUsuario = parseInt(req.params.idUsuario);
    const datosDB = leerBDJSON();

    const indiceEliminar = datosDB.Usuarios.findIndex((user) => user.id === idUsuario );

    if(indiceEliminar !== -1){
        datosDB.Usuarios.splice(indiceEliminar, 1);
        actualizarBDJSON(datosDB);
        res.status(200).json({User_Eliminado: "Se elimino el usuario con exito"})
    }else{
        res.status(400).json({error: "No se encontro el usuario"});
    }
});

router.delete("/Productos/:idProducto", (req, res) => {
    const idProducto = parseInt(req.params.idProducto);
    const datosDB = leerBDJSON();

    const indiceEliminar = datosDB.Productos.findIndex((producto) => producto.id === idProducto );
    if (indiceEliminar !== -1){
        datosDB.Productos.splice(indiceEliminar,1);
        actualizarBDJSON(datosDB);
        res.status(200).json({Producto_Eliminado: "Se elimino el producto con exito"});
    }else{
        res.status(404).json({error: "No se encontro el producto"})
    }
});

router.delete("/Ventas/:idVenta", (req, res) => {
    const idVenta = parseInt(req.params.idVenta);
    const datosDB = leerBDJSON();
    
    const indiceEliminar = datosDB.Ventas.findIndex((venta) => venta.id === idVenta);

    if (indiceEliminar !== -1) {
        //Se encontro el indice de la venta por medio del id de esta
        datosDB.Ventas.splice(indiceEliminar, 1);
        //Actualizamos nuestro JSON:
        actualizarBDJSON(datosDB);
        res.status(200).json({Venta_Eliminada: "Se elimino la venta con exito"});
    }else{
        res.status(404).json({error: "No se encontro la venta"})
    }
});

module.exports = router;
