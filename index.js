

const express=require('express');
const mongoose=require('mongoose');
const app=express();

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
