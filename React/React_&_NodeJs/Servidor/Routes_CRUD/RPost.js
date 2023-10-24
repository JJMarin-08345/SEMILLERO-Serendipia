const express = require('express');
const router = express.Router();
const { leerBDJSON, actualizarBDJSON } = require('./FunJSON');

const correcto = (entidad) => `Datos de ${entidad} recibido correctamente`;

router.post('/Productos/CrearProducto', (req, res) => {
    const newProducto = req.body;
    if (newProducto) {
        if (newProducto.Precio > 99) {
            res.status(201).send(correcto('Producto'));
        }
    }
});

router.post('/Venta/CrearCenta', (req, res) => {
    const newPedido = req.body;
    if (newPedido) {
        res.status(201).send(correcto('Venta'))
    }

});

router.post('/Usuario/CrearUsuario', (req, res) => {
    let newUsuario = req.body;
    const datosDB = leerBDJSON();
    const lastId = datosDB.Usuarios[(datosDB.Usuarios.length - 1)]?.id || 0;

    console.log(lastId);

    newUsuario = {
        id: lastId + 1,
        ...newUsuario,
    }

    if (newUsuario.Nombre === '' || newUsuario.TipoUsuario === '' ) {
        res.status(400).json({ error: 'Ausencia de datos' });
    } else {
        if (newUsuario.TipoUsuario === '1') {
            console.log(newUsuario);
            datosDB.Usuarios.push(newUsuario);
            actualizarBDJSON(datosDB);
            res.status(201).send(correcto('Administrador'));

        } else if (newUsuario.TipoUsuario === '2') {
            console.log(newUsuario);
            datosDB.Usuarios.push(newUsuario);
            actualizarBDJSON(datosDB);
            res.status(201).send(correcto('Mesero'));
        }
    }

});

module.exports = router;