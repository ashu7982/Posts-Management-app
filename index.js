

const express=require('express');
const mongoose=require('mongoose');
const app=express();
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');


app.use(express.json());


// our routes

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

//we are connecting our database with our project.
const connection=async()=>{
    try{
          await mongoose.connect('mongodb+srv://ashutoshdubey7982:<password>@cluster0.j7yjy3v.mongodb.net/?retryWrites=true&w=majority')
    }
    catch(err){
            console.log(err);
    }
}


//running our server.
app.listen(8080,async()=>{
    try{

    }
    catch(err){
           console.log(err);
    }
})
