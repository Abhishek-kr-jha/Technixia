const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  mongoose = require('mongoose-pagination-v2')

const studentSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    age:{
        type:Number
    }
},{timestamps:true})


studentSchema.plugin(mongoosePaginate)
const Student = mongoose.model('student',studentSchema)
module.exports = Student