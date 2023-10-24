const express = require('express');
const router = express.Router();
const { leerBDJSON, actualizarBDJSON } = require('./FunJSON');

const correcto = (entidad) => `Datos de ${entidad} recibido correctamente`;

router.post('/Productos', (req, res) => {
    const newProducto = req.body;
    if (newProducto) {
        if (newProducto.Precio > 99) {
            res.status(201).send(correcto('Producto'));
        }
    }
});

router.post('/Pedidos', (req, res) => {
    const newPedido = req.body;
    if (newPedido) {
        res.status(201).send(correcto('Pedido'))
    }

});

router.post('/Usuario', (req, res) => {
    let newMesero = req.body;
    const datosDB = leerBDJSON();
    const lastId = datosDB.Usuarios[(datosDB.Usuarios.length - 1)]?.id || 0;
    
    console.log(lastId);

    newMesero = {
        id: lastId + 1,
        ...newMesero,
    }

    if (newMesero.Nombre === "" || newMesero.TipoUsuario !== 2) {
        res.status(400).json({ error: 'Ausencia de datos' });
    } else {

        datosDB.Usuarios.push(newMesero);
        actualizarBDJSON(datosDB);
        res.status(201).send(correcto('Mesero'));
    }

});

module.exports = router;