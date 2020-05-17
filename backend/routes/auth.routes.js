const express = require('express');
const routerAuth = express.Router();
const passport = require('passport');

const jwt = require('jsonwebtoken');

const authController = require('../controllers/auth.controller');

const SECRET_KEY = 'secretkey123456';

//routerAuth.post('/auth/facebook',auht.authFacebook);

//routerAuth.post('/auth/facebook/token',(req,res) => {console.log(req.body);});

//routerAuth.post('/auth/facebook/token', (req,res) => { console.log(req);}); 

// ESTE ANDA
//routerAuth.post('/auth/facebook/token', passport.authenticate('facebook-token'));

routerAuth.post('/auth/facebook/token', passport.authenticate('facebook-token'),authController.facebookOAuth);

//routerAuth.post('/auth/facebook/token', auth.verificarToken);

//routerAuth.post('/singin',auht.singin);
//routerAuth.post('/login',auht.login);
//routerAuth.post('/perfil',auht.perfil);




const checkToken = (req, res, next) => {
    console.log(req.headers);

    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {

        token = token.slice(7, token.length);

        console.log(`El token es ${token}`);

        if (token) {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                  return res.json({
                    success: false,
                    message: 'Token is not valid'
                  });
                } else {
                  req.decoded = decoded;
                  next();
                }
              });
        }
        else {
            return res.json({
              success: false,
              message: 'Auth token is not supplied'
            });
          }
    }

};

routerAuth.get('/*', checkToken, (req,res) => {console.log('OKEY');} );
/*
    console.log(req.headers);
    
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);

    console.log(`El token es ${token}`);

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
    };
  }
}*/
/*
    .log(res);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    , (req,res) => {
        res.json({status: 'Logueado correctamente'});
    }*/

/*
routerAuth.get('/login', passport.authenticate({
    successRedirect: '/',
    failureRedirect: '/login'
}));*/

module.exports = routerAuth;