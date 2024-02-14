const express=require("express");
const app=express();
app.use(express.json());
const PORT=1900;
const mongoose=require("mongoose");
const cors=require("cors");
app.use(cors())
// app.use(cors({origin:"http://localhost:3000/"}, Method="GET"));


// PORT=process.env.Port || 1900;
// const bcrypt=require("bcryptjs");
// const jsonwebtoken=require("jsonwebtoken");
// const body=require('body-parser');

mongoose.connect("mongodb+srv://ramya:Ramya1234@cluster0.ssbc8ox.mongodb.net/",
{
    useNewUrlParser:true,
});

const db=mongoose.connection;
// db.on("error",console.error.bind(console,"connection failed")),
db.on("error",(error)=>{
    console.log("Connection Error");
})
db.once("open",()=>{
    console.log("Connected Successfully");
});

const rout=require("./Routers/router");
app.use("/",rout);

app.listen(PORT,()=>{
    console.log(`Server is running on: ${PORT}`);
});

app.use(cors({
  origin: "https://zomato-frontend-bay.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"], // specify the allowed HTTP methods
}));
