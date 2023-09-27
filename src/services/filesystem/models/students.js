const StudentService = require("../students.service");

class Student{
    constructor(name, lastName, age){
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.cursos = new Array();
    }
};

module.exports = Student