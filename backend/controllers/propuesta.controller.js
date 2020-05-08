const Propuesta = require('../models/propuesta');
const Usuario = require('../models/usuario');

const propuestaController = {};

propuestaController.getPropuestas = async (req,res) => {
    const propuestas = await Propuesta.find().populate('usuario');
    res.json(propuestas);
};

propuestaController.createPropuesta = async (req,res) => { 
    const propuesta = new Propuesta(req.body);  
    await propuesta.save();
    await Usuario.findOneAndUpdate({_id: req.body.usuario }, { $push: { propuestas: propuesta._id }});
    res.json({status: 'propuesta guardada y asignada', _id: propuesta._id });
    
};

propuestaController.getPropuesta = async (req,res) => {
    const propuesta = await Propuesta.findById(req.params.id);
    res.json(propuesta);
};

propuestaController.editPropuesta = async (req,res) => {
    await Propuesta.findOneAndUpdate({_id:req.params.id}, req.body);
    res.json({status: 'propuesta actualizada', _id: propuesta._id });
};

propuestaController.deletePropuesta = async (req,res) => {
    await Propuesta.findByIdAndRemove(req.params.id);
    res.json({status: 'propuesta eliminada', _id: req.body._id });
};

propuestaController.getPropuestasUsuario = async (req,res) => {
    const propuestas = await Propuesta.find().where({ usuario: req.params.usuario })
    res.json(propuestas);
};

module.exports = propuestaController;