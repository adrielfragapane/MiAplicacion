const Usuario = require('../models/usuario');

const usuarioController = {};

usuarioController.getUsuarios = async (req,res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

usuarioController.createUsuario= async (req,res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({status: 'Usuario guardado'});
};

usuarioController.getUsuario= async (req,res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
};

usuarioController.editUsuario= async (req,res) => {
    await Usuario.findOneAndUpdate({_id: req.params.id}, req.body);
    res.json({status: 'Usuario actualizado'});
/*
    const { id } = req.params;
    await Usuario.findOneAndUpdate(id, {$set: req.body});
    res.json({status: 'Usuario actualizado ' + id + ' ' + ' ' + req.body._id});*/
};

usuarioController.deleteUsuario= async (req,res) => {
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({status: 'Usuario eliminado'});
};

module.exports = usuarioController;