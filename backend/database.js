const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true); 

const URI = 'mongodb://localhost/MiAplicacion';

mongoose.connect(URI)
    .then(db => console.log('Conectado a base de datos "MiAplicacion"'))
    .catch(err => console.log(err));

module.exports = mongoose;