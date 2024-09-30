const mongoose = require("mongoose");

//Write missing code here for database connection
require('dotenv').config()
mongoose.connect(process.env.mongoDB_URL)
.then(()=>{
    console.log('connected to database');
})
.catch(()=>{
    console.log('error connecting to database');
})