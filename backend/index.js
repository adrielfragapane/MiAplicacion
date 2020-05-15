
const fileUpload = require('express-fileupload');
const mongoose = require('./database');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


//Configurar puerto
app.set('port', process.env.PORT || 3000);

//Sesion
app.use(session({
    secret: '076ee61d63aa10a125ea872411e433b9',
    resave: true,
    saveUninitialized: true,
    maxAge: new Date(Date.now() + 3600000),
    store: new mongoStore({
        url: 'mongodb://localhost/MiAplicacion',
        autoReconnect: true
    })
}));


app.get('/sesion', (req,res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.send(`Has visto esta página ${req.session.cuenta} veces!!`);
})


//FileUpload
app.use(fileUpload());

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); // permite que el servidor entienda objetos json
//app.use(express.urlencoded({extended: false}));
app.use(cors({origin: 'http://localhost:4200'}));

//Se indica que el usuario va a ver la ruta "/public" pero en el servidor representa "/storage/imgs"
app.use('/dinamico', express.static(`${__dirname}/storage/dinamico`));
app.use('/estatico', express.static(`${__dirname}/storage/estatico`));

//Routes
app.use('/usuarios',require('./routes/usuario.routes'));
app.use('/propuestas',require('./routes/propuesta.routes'));
app.use('/auth',require('./routes/auth.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});