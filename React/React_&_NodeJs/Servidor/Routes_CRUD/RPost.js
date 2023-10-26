const express = require('express');
const router = express.Router();
const { leerBDJSON, actualizarBDJSON } = require('./FunJSON');

const correcto = (entidad, Body) => {
    return {
        exitoProceso: `Datos de ${entidad} recibidos correctamente`,
        body: Body
    }
}

function asignarId(Objeto, propiedadId) {
    let lastId = Objeto.length > 0 ? Objeto[Objeto.length - 1][propiedadId] : 0;
    // Esto es lo mismo que decir:
    //const lastId = datosDB.Usuarios[(datosDB.Usuarios.length - 1)]?.id || 0;
    return lastId + 1;
}



//CREAR USUARIO
router.post('/Usuarios/CrearUsuario', (req, res) => {
    let newUsuario = req.body;
    const datosDB = leerBDJSON();

    newUsuario = {
        id: asignarId(datosDB.Usuarios, 'id'),
        ...newUsuario
    }

    if (newUsuario.Nombre === "" || newUsuario.TipoUsuarioId === "") {
        res.status(400).json({ error: "Ausencia de datos" });
    } else {
        if (newUsuario.TipoUsuarioId === "1") {
            console.log(newUsuario);
            datosDB.Usuarios.push(newUsuario);
            actualizarBDJSON(datosDB);
            res.status(201).json({ exito: correcto('Administrador') });

        } else if (newUsuario.TipoUsuarioId === "2") {
            console.log(newUsuario);
            datosDB.Usuarios.push(newUsuario);
            actualizarBDJSON(datosDB);
            res.status(201).json({ exito: correcto('Mesero') });
        }
    }

});

// CREAR PRODUCTO
router.post('/Productos/CrearProducto', (req, res) => {
    let newProducto = req.body;
    const datosDB = leerBDJSON();
    newProducto = {
        id: asignarId(datosDB.Productos, 'id'),
        ...newProducto
    }

    if (Object.keys(newProducto).length > 0) {
        if (newProducto.Precio > 99) {
            console.log(newProducto);
            datosDB.Productos.push(newProducto);
            actualizarBDJSON(datosDB);
            res.status(201).json({ exito: correcto('Producto', newProducto) });
        } else {
            res.status(400).json({ error: "El precio debe ser mayor a 99" });
        }
    } else {
        res.status(400).json({ error: "Datos faltantes" });
    }
});


//CREAR VENTA
router.post('/Ventas/CrearVenta', (req, res) => {
    let newVenta = req.body;
    const datosDB = leerBDJSON();

    newVenta = {
        id: asignarId(datosDB.Ventas, 'id'),
        ...newVenta
    }

    if (Object.keys(newVenta).length > 0) {
        if (newVenta.MeseroId !== "") {
            //Verificamos si el mesero existe:
            const isMeseroExists = datosDB.Usuarios.find((meseroId) => meseroId.id === newVenta.MeseroId);
            if (newVenta.ProductosIds.length > 0) {
                //Verificamos si los productos existen:
                const isProductosExists = newVenta.ProductosIds.every((productoId) =>
                    datosDB.Productos.some((producto) => producto.id === productoId)
                );

                if( isMeseroExists && isProductosExists){
                    res.status(200).json({exito: correcto('Venta', newVenta)})
                }else if(!isMeseroExists){
                    res.status(400).json({errorIngresarMesero: "El mesero no existe"});
                }else if(!isProductosExists){
                    res.status(400).json({errorIngresarProductos: "Alguno de los productos no existen"})
                }

            } else {
                res.status(400).json({ error: "No se ha seleccionado ningun producto" });
            }
        } else {
            res.status(400).json({ error: "No hay ningun mesero asignado a esta venta" });
        }

    } else {
        res.status(400).json({ error: "No se recibio ningun dato" });
    }

});



module.exports = router;