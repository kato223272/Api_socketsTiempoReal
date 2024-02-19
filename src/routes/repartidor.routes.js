const {Router} = require('express')
const {crearRepartidor,conseguirRepartidor,obtenerReparNew} = require('../controller/Repartidor.js')
const router = Router()

router.post('/crearProducto',crearRepartidor)
router.get('/conseguirProducto',conseguirRepartidor)
router.get('/ObtenerProductoNuevo',obtenerReparNew)

module.exports = router;