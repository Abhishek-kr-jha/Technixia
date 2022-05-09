const Teacher = require('../models/Teacher')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UsernameAttributes } = require('aws-amplify-react');
const res = require('express/lib/response');

const register = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
    })
    let teacher = new Teacher({
        name:req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        password:hashedPass
    })
    teacher.save()
    .then(teacher=>{
        res.json({
            message:'Tecaher Added Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message:'An error occured'
        })
    })
}

const login = (req,res,next)=>{
    var teachername = req.body.teachername
    var password = req.body.password

    Teacher.findOne({$or:[{email:teachername},{phone:teachername}]})
    .then(teacher=>{
        if(teacher){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name:teacher.name},'AZQ,PI)0(',{expiresIn:'1h'})
                    let refreshtoken = jwt.sign({name:teacher.name},'AZQ,QI)0(',{expiresIn:'24h'})
                    res.json({
                        message:'login successfull',
                        token,
                        refreshtoken
                    })
                }else{
                    res.json({
                        message:'Password does not exist'
                    })
                }
            })

        }else{
            res.json({
                message:'No teacher found!'
            })
        }
    })
}
const refreshToken = (req,res,next)=>{
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'AZQ,QI)0(',function(err,decode){
        (err){
            res.status(400).json({
                err
            })
        }
        else{
            let token = jwt.sign({name:jwt.decode.name},'AZQ,PI)0(',{expiresIn:'60s'})
            let refreshToken = req.body.refreshToken 
            res.status(200).json({
                message:"Token refreshed successfully",
                token,
                refreshToken
            })
        }
    })

}
module.exports = {
    register, login, refreshToken
}