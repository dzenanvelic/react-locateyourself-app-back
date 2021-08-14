const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const morgan = require('morgan');
const pinRoute = require('./routes/pins')
const usersRoute = require('./routes/users')
const app = express()
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true,
}
    
    ).then(res=>console.log("Mongo database for location app connected"))
    .catch(error=>{
        console.log("MONGO DB ERROR", error);
    })
//middlevares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/pins',pinRoute)
app.use('/api/users',usersRoute)

//server running
app.listen(port,()=>{
    console.log(`Server runs on port ${port}`);
})