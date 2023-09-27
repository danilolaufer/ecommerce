const { Router } = require ('express');
const { getAll, createStudent }=   require('../controllers/students.controller.js');

const router = Router();


router.get('/', getAll);

router.post('/', createStudent);

omdule.exports = router;