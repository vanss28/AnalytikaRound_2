const express = require('express')
const app = express();
// HTTP request logger middleware ke liye
const morgan = require('morgan') 
// MongoDB ke saath kaam karne ke liye mongoose library
const mongoose = require('mongoose') 
// Incoming request bodies ko parse karne ke liye middleware
const bodyParser = require('body-parser') 
const dotenv = require('dotenv') 

dotenv.config() // .env file se environment variables ko load karta hai

const Port = process.env.port || 4000 
const url= process.env.mongo_url; 

app.use(bodyParser.json()); 
app.use(express.json()) 

// MongoDB se connection establish karne ke liye aur server start karne ke liye
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB'); 
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`); 
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error); 
  });

const userRouter = require('./routes/userR') 
app.use('/user',userRouter) // '/user' route par userRouter ko use karega

const imageRouter = require('./routes/imageR') // Images se related routes handle karne ke liye
app.use('/images',imageRouter) 
