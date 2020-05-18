
const fileUpload = require('express-fileupload');
const mongoose = require('./database');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const facebookTokenStrategy = require('passport-facebook-token');
const cookieParser = require('cookie-parser');

const passport2 = require('./passport');

const User = require('./models/user');

//Configurar puerto
app.set('port', process.env.PORT || 3000);

/*app.use(cookieParser('076ee61d63aa10a125ea872411e433b9'));*/

//Sesion
/*app.use(session({
    secret: '076ee61d63aa10a125ea872411e433b9',
    resave: true,
    saveUninitialized: true,
    maxAge: new Date(Date.now() + 3600000),
    store: new mongoStore({
        url: 'mongodb://localhost/MiAplicacion',
        autoReconnect: true
    })
}));*/

app.use(passport.initialize());
app.use(passport.session());

/*
passport.use(new localStrategy(function (usuario,password,done) { 
    if(usuario === 'Adriel' && password === '1234') {
        return done(null,{nombre: 'Adriel', id: 1})
    }
    return done(null,false);
 }));*/

/*
app.get('/sesion', (req,res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.send(`Has visto esta página ${req.session.cuenta} veces!!`);
});*/

//FileUpload
app.use(fileUpload());

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); // permite que el servidor entienda objetos json
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:4200'}));

//app.use(passport.initialize())


//Se indica que el usuario va a ver la ruta "/public" pero en el servidor representa "/storage/imgs"
app.use('/dinamico', express.static(`${__dirname}/storage/dinamico`));
app.use('/estatico', express.static(`${__dirname}/storage/estatico`));

//Routes
app.use('/',require('./routes/auth.routes'));
app.use('/usuarios',require('./routes/usuario.routes'));
app.use('/propuestas',require('./routes/propuesta.routes'));


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});