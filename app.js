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

const mongoUrl = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(mongoUrl,{useNewUrlParser:true},()=>{
    console.log('connected to DB Mongo Atlas!');
})

app.listen(3030)