const express = require('express');
const DataDB = require('../db/Datos.json');

const router = express.Router();


// Traer Meseros "uniendo" la tabla TipoUsuario y Usuario
let Meseros = DataDB.Usuarios.filter((mesero) => mesero.TipoUsuarioId === 2);
Meseros = Meseros;

// Traer Administradores "uniendo" la tabla TipoUsuario y Usuario
let Admin = DataDB.Usuarios.filter((admin) => admin.TipoUsuarioId === 1);
Admin = Admin;

const Productos = DataDB.Productos;

const Ventas = DataDB.Ventas;

// GET USUARIOS
// Traer todos los Meseros
router.get("/Usuarios/MostrarMeseros", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Meseros);
});

// Traer todos los Administradores
router.get("/usuarios/MostrarAdmins", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Admin);
});


//GET PRODUCTOS
// Traer Todos los Productos
router.get("/Productos/MostrarProductos", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Productos);
});

// GET VENTAS
// Traer Todas las ventas
router.get("/Ventas/MostrarVentas", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(Ventas);
});

// Traer Todas las ventas por mesero
router.get("/Ventas/VentasXMesero", (req, res) => {
    const MsroId = parseInt(req.query.MsroId);
    console.log(MsroId);
    if (isNaN(MsroId)) {
        res.status(400).json({ error: 'El parametro MeseroId es invalido' })
    } else {
        const VentasXMsro = DataDB.Ventas.filter((ventas) => ventas.MeseroId === MsroId);
        if(VentasXMsro.length>0){
            res.status(200).json(VentasXMsro);
        }else{
            res.status(404).json({error: "El mesero no tiene ventas"});
        }
    }
});

module.exports = router;


