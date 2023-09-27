const StudentServiceDao = require("../db/dao/students.dao.js");
const CoursesDao = require("../db/dao/courses.dao.js")
const StudentRepository = require("./students.repository.js");
const CoursesRepository = require("./courses.repository.js");

const studentDao = new StudentServiceDao()
const coursesDao = new CoursesDao();

const studentService = new StudentRepository(studentDao);
const coursesService = new CoursesRepository(coursesDao);

module.exports = {
    StudentRepository,
    CoursesRepository
}