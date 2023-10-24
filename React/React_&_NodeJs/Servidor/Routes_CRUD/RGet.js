const express = require('express');
const DataDB = require('../db/Datos.json');

const router = express.Router();


// Traer Meseros "uniendo" la tabla TipoUsuario y Usuario
let Meseros = DataDB.Usuarios.filter((mesero) => mesero.TipoUsuarioId === 2);
Meseros = JSON.stringify(Meseros, null, 2);

// Traer Administradores "uniendo" la tabla TipoUsuario y Usuario
let Admin = DataDB.Usuarios.filter((admin) => admin.TipoUsuarioId === 1);
Admin = JSON.stringify(Admin, null, 2);

let Productos = JSON.stringify(DataDB.Productos, null, 2);


router.get("/Meseros", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(Meseros);
});

router.get("/Admin", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(Admin);
});

router.get("/Productos", (req, res) =>{
    res.setHeader('Content-Type','application/json');
    res.send(Productos);
});

module.exports = router;


