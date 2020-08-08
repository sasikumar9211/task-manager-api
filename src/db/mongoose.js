const mongoose = require('mongoose')
const dotenv = require("dotenv");

require('dotenv').config({path:'../config/.env'})

console.log(process.env.PORT)
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})