



//we are connecting our database with our project.
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');

app.use(express.json());

// Our routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);



// Connecting to the database
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://ashutoshdubey7982:Yts2tKlceOaC3hcv@cluster0.j7yjy3v.mongodb.net/mydatabase?retryWrites=true&w=majority');
      console.log('Connected to Our Server');
    } catch (error) {
      console.error( error);
    }
  };
  
//   connectDB();
  
  // Starting the server
  app.listen(3000, () => {
    connectDB();
    console.log('Server started on port 3000');
});
