const { Router } = require('express');
const { getAll, save }  = require('../controllers/courses.controller.js')
const { addLogger }  = require('../config/logger.js');

const router = Router();

router.get('/', addLogger, getAll);

router.post('/', save);


module.exports=  router;