const student = require('../models/Student');
// const Student = require('../models/Student');

// show the list pf Students
const index = (req,res,next)=>{
    Student.paginate({},{page:req.query.page, limit:req.query.limit})
    .then(resposne=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message:"An Error Oocured:" +error
        })
    })
}


// show single  student
const show = (req,res,next)=>{
    let studentID = req.body.studentID
    Student.findById(studentID)
    .then(resposne=>{
        res.json({
            resposne
        })
    })
    .catch(error=>{
        res.json({
            message:'An error Occured'
        })
    })
}


// add new student
const store = (req,res,next)=>{
    let student = new Student({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age

    })
    student.save()
    .then(resposne=>{
        res.json({
            message:'Student Added Sucessfully'
        })
    })
    .catch(error=>{
        res.json({
            message:'An error Occured'
        })
    })
}

// update an student by

const update =(req,res,next)=>{
    let studentID = req.body.studentID

    let updatedData ={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    }
    student.findByIdAndupdate(studentID,{$set:updatedData})
    .then(()=>{
        res.json({
            message:'Student updated Successfully!!'
        })
    })
    .catch(error=>{
        res.json({
            message:'An error Occured'
        })
    })
}

// delete an student 

const destroy = (req,res,next)=>{
    let studentID = req.body.studentID
    Student.findByIdAndRemove(student)
    .then(()=>{
        req.json({
            message:'Student deleted successfully!'
        })
    })
    .catch((error)=>{
        req.json({
            message:'An error occured'
        })
    })
}

module.exports ={
    index,show,store,destroy
}