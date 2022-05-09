const mongoose = require('mongoose');
const Schema = mongoose.Schema
const teacherSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },

},{timeStamp:true})

const User = mongoose.model('teacher',teacherSchema)
module.exports =Teacher