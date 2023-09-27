const mongoose = require ('mongoose');

const collectionName = 'courses';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};


const courseSchema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    teacherName: stringTypeSchemaNonUniqueRequired,
    students: {
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model(collectionName, courseSchema);
