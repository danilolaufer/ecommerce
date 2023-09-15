const config = require("../config/config.js");

function isUser(req, res, next) {
    if (req.session?.user?.email) {
      return next();
    }
    return res.status(401).render('error', { error: 'Authentication error, please try again' });
}

function isAdmin(req, res, next) {
    if(req.session.user.email === config.adminEmail && req.session.user.password === config.adminPassword){
        req.session.user.rol = "admin"
    }
    if (req.session.user.rol === "admin") {
      return next();
    }
    return res.status(403).render('error', { error: 'You have no access, authorization is required' });
}

function goToLogin(req, res, next){
  if (req.session?.user?.email) {
    return next();
  }
  return res.status(401).render('login', { });
}

module.exports = { isUser, isAdmin, goToLogin };
