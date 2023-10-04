const { fileURLToPath } = require('url');
const { dirname } = require('path');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => {
  console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
  return bcrypt.compareSync(password, user.password);
};

// Funciones de JSON Web Tokens (JWT)
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '120s' });
};

// Utilidad para llamadas más controladas de las estrategias de Passport
const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log("Entrando a llamar la estrategia: ");
    console.log(strategy);
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      console.log("Usuario obtenido de la estrategia: ");
      console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = {
  createHash,
  isValidPassword,
  PRIVATE_KEY,
  generateJWToken,
  passportCall,
  __dirname}
