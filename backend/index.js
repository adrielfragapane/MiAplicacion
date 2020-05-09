const fileUpload = require('express-fileupload');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


const { mongoose } = require('./database');

//Setings
app.set('port', process.env.PORT || 3000);

//FileUpload
app.use(fileUpload());

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); // permite que el servidor entienda objetos json
//app.use(express.urlencoded({extended: false}));
app.use(cors({origin: 'http://localhost:4200'}));

//Se indica que el usuario va a ver la ruta "/public" pero en el servidor representa "/storage/imgs"
app.use('/public', express.static(`${__dirname}/storage/imgs`));

//Routes
app.use('/usuarios',require('./routes/usuario.routes'));
app.use('/propuestas',require('./routes/propuesta.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});