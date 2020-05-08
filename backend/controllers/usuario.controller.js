const Usuario = require('../models/usuario');

const usuarioController = {};

usuarioController.getUsuarios = async (req,res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

usuarioController.createUsuario= async (req,res) => {
    console.log(req.body);
    const usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
    });
    await usuario.save();
    res.json({status: 'Usuario guardado'});
};

usuarioController.getUsuario= async (req,res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
};

usuarioController.editUsuario= async (req,res) => {
    const { id } = req.params;
    await Usuario.findOneAndUpdate(id, {$set: req.body});
    res.json({status: 'Usuario actualizado ' + id + ' ' + ' ' + req.body._id});
};

usuarioController.deleteUsuario= async (req,res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({status: 'Usuario eliminado'});
};

module.exports = usuarioController;