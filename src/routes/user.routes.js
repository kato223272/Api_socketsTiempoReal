const { Router } = require('express');
const { crearUsuario, conseguirUnicoUsuario, iniciarSesion, eliminarUsuario } = require('../controller/userController');
const jwt = require('jsonwebtoken');

const router1 = Router();

router1.get("/conseguirUnicoUsuario", conseguirUnicoUsuario);
router1.post('/crearUsuario', crearUsuario);
router1.post('/iniciarSesion', iniciarSesion);

router1.use((req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token no válido" });
        }

        req.userId = decoded.userId;
        next();
    });
});

router1.delete('/eliminarUsuario/:user_id', eliminarUsuario);
router1.get("/recursosProtegidos", (req, res) => {
  
    res.json({ message: "Acceso autorizado a recursos protegidos" });
});

module.exports = router1;
