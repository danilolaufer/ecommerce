const {Router} = require('express');
const {studentService}=  require('../services/repository/services.js');
const CourseServiceDao=require('../services/db/dao/courses.dao.js');
const { passportCall }= require("../util.js");

const courseService = new CourseServiceDao();

const router = Router();

router.get('/', passportCall('jwt'), async(req,res)=>{
    const student = req.user;
    console.log("Estudiante logueado: ");
    console.log(student);
    let students = await studentService.getAll();
    console.log(students);
    res.render('students',{students: students})
});

router.get('/student', passportCall('jwt'), async(req,res)=>{
    const student = req.user;
    console.log("Estudiante logueado: ");
    console.log(student);
    let students = new Array();
    students.push(student);
    res.render('students',{students: students});
});

router.get('/courses', passportCall('jwt'), async(req,res)=>{
    let courses = await courseService.getAll();
    console.log(courses);
    res.render('courses',{courses})
})


module.exports= router