const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');


const AuthRoute = require('./routes/auth')
const student = require('./routes/student');
mongoose.connect("mongodb+srv://Teacher:Teacher@cluster0.b8lge.mongodb.net/Teacher-system?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology:true});

const db = mongoose.connection

db.on('err',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("Database Connected Successful")
})

const app = express()
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/student',student)
app.use('/api',AuthRoute)