const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropuestaSchema = new Schema({

    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    usuario: {type: Schema.ObjectId, ref: 'Usuario', required: false}
});

module.exports =mongoose.model('Propuesta',PropuestaSchema);