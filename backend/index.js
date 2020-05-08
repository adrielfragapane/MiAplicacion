const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


const { mongoose } = require('./database');

//Setings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); // permite que el servidor entienda objetos json
//app.use(express.urlencoded({extended: false}));
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/usuarios',require('./routes/usuario.routes'));
app.use('/propuestas',require('./routes/propuesta.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});