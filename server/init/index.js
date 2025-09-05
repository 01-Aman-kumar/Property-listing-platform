const mongoose=require("mongoose");
const initData=require("./data.js");
const property = require("../models/property.js");


main().then(()=>{
    console.log("connect to MongoDB");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb+srv://aryanraj854326_db_user:oR2DH4JUdxa26zmw@cluster0.dy5rxii.mongodb.net/propdb?retryWrites=true&w=majority&appName=Cluster0");
}

const initDB=async()=>{
    await property.deleteMany({});
    await property.insertMany(initData.data);
    console.log("data was intitialized");
};
initDB();