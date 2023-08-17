const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        unique: true,
        require: true
    },
    lastname:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        
    }
});

const User = mongoose.model("User", UserSchema)

module.exports = User