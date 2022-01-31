const express  = require('express');
const app = express();
require('dotenv/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// import routes
const postRoutes = require('./routes/post')

app.use(bodyParser.json())

app.use('/post', postRoutes)

// connect to DB
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('connected to DB Mongo Atlas!');
})

app.listen(3030)