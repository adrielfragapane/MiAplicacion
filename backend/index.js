
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
const cookieParser = require('cookie-parser');

//Configurar puerto
app.set('port', process.env.PORT || 3000);

app.use(cookieParser('076ee61d63aa10a125ea872411e433b9'));

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(function (usuario,password,done) { 
    if(usuario === 'Adriel' && password === '1234') {
        return done(null,{nombre: 'Adriel', id: 1})
    }
    return done(null,false);
 }));

 passport.use(new facebookStrategy({
    clientID: '3534806666534396',
    clientSecret: '43d68a162af24c649dc3c13511fefbdb',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



 passport.serializeUser(function(usuario,done){
     done(null,usuario.id)
 });

 passport.deserializeUser(function(id,done) {
    done(null,{nombre: 'Adriel', id: 1});
 })

app.get('/sesion', (req,res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;
    res.send(`Has visto esta página ${req.session.cuenta} veces!!`);
});


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