const express = require('express');
const app=express();
const mongoose = require('mongoose');
var corse = require('cors');

const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const userRoutes = require('./routes/userRoutes');

mongoose.connect('mongodb://127.0.0.1:27017/Payment-Portal')
.then(()=>console.log('Connected to DB'))
.catch((err)=>{
    console.log("DB error"); 
    console.log(err)
})

app.use(cors({origin:['http://localhost:5173']}));

app.use(express.urlencoded({extended:true})); // form data
app.use(express.json());  // json data

app.use(authRoutes);
app.use(userRoutes);
pp.use(paymentRoutes);

app.get('/' , (req,res)=>{
    res.send('Welcome to payment-portal');
})
// seedDB();
const server = app.listen(8080 , (req,res)=>{
    console.log("Server connected at port 8080");
})
