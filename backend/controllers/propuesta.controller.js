const Propuesta = require('../models/propuesta');

const propuestaController = {};

propuestaController.getPropuestas = async (req,res) => {
    const propuestas = await Propuesta.find();
    res.json(propuestas);
};

propuestaController.createPropuesta= async (req,res) => {
    const propuesta = new Propuesta(req.body);
    await propuesta.save();
    res.json({status: 'propuesta guardada'});
};

propuestaController.getPropuesta= async (req,res) => {
    const propuesta = await Propuesta.findById(req.params.id);
    res.json(propuesta);
};

propuestaController.editPropuesta= async (req,res) => {
    await Propuesta.findOneAndUpdate({_id: req.params.id}, req.body);
    res.json({status: 'propuesta actualizada'});
};

propuestaController.deletePropuesta= async (req,res) => {
    await Propuesta.findByIdAndRemove(req.params.id);
    res.json({status: 'propuesta eliminada'});
};

propuestaController.getPropuestasUsuario = async (req,res) => {
    const propuestas = await Propuesta.find().where({ usuario: req.params.usuario })
    res.json(propuestas);
};
module.exports = propuestaController;