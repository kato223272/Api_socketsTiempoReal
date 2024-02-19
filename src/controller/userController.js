const User = require ('../models/UsersModel.js');

const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
    const { user, password } = req.body;
    
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

    try{
        if(!user || !password){
            return res.status(400).json({error:'Todos los campos son obligatorios'})
        }
    
        if(!permitido.test(user)){
            return res.status(400).json({error:"Nombre inválido, solo se aceptan acentos como caracteres especiales"})
        }
    
        if(!permitido.test(password)){
            return res.status(400).json({error:"password, solo se aceptan acentos como caracteres especiales"})
        }
    
        await User.sync();
        const newUser = await User.create({
            user: user,
            password: password
        })

        await newUser.validate();
        await newUser.save();
        res.json({
            newUser,
            message:"usuario registrado"
        });
    }catch(error){
        res.status(500).json({error: "Error al registrar usuario"});
        console.log(error);
    }
}



const conseguirUnicoUsuario = async (req,res) =>{
    const { user, password } = req.body;
    console.log(res.query);
    try {
        const userO = await User.findOne({
            where:{
                user: user,
                password: password
            }
        });

        res.json({
            userO,
            message:"Usuario encontrado"
        });
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el usuario" });
        console.log(error);
    }
}

const iniciarSesion = async (req, res) => {
    const { user, password } = req.body;

    try {
        const usuario = await User.findOne({
            where: {
                user: user,
                password: password
            }
        });

        if (!usuario) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = jwt.sign({ userId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            usuario,
            token,
            message: "Inicio de sesión exitoso"
        });
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
        console.log(error);
    }
};

const eliminarUsuario = async (req, res) => {
    const { user_id } = req.params;

    try {
        const usuario = await User.findByPk(user_id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        await usuario.destroy();
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar usuario" });
        console.log(error);
    }
};

module.exports = {
    crearUsuario,
    conseguirUnicoUsuario,
    iniciarSesion,
    eliminarUsuario
};
