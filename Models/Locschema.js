const mongoose=require("mongoose");

const LoctnSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    city_id:{
        type:Number,
        required:true,
    },
    location_id:{
        type:Number,
        required:true,
    },
    
    city:{
        type:String,
        required:true,
    },
    country_name:{
        type:String,
        required:true,
    }
    });
    module.exports=mongoose.model("Locat",LoctnSchema,"Locat");