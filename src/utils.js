const { fileURLToPath } = require('url');
const { dirname } = require('path');

// Imports para sesiones y autenticación:
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Funciones de cifrado
exports.createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

exports.isValidPassword = (user, password) => {
  console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
  return bcrypt.compareSync(password, user.password);
};

// Funciones de JSON Web Tokens (JWT)
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

exports.generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '120s' });
};

// Utilidad para llamadas más controladas de las estrategias de Passport
exports.passportCall = (strategy) => {
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

// Exporta __dirname
module.exports = __dirname;
