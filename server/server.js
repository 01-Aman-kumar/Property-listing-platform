const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config({override:true});
const cors = require('cors');
const mongoose=require("mongoose");
const authRoutes = require('./routes/auth');
const propRoutes = require('./routes/properties');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/properties', propRoutes);


main().then(()=>{
    console.log("connect to mongodb");
})
.catch((err)=>{
    console.log(err);
})

async function main(params) {
    await mongoose.connect(process.env.MONGO_URI);
}


app.listen(process.env.PORT,()=>{
    console.log("server is running on Port "+ process.env.PORT);
});