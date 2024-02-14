const mongoose = require("mongoose")
                      
const MenuSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    item:[
        {
        menu:{type:String, require:true},
        price:{type:Number, require:true},
        quantity:{type:Number, require:true}
        },
        {
            menu:{type:String, require:true},
            price:{type:Number, require:true},
            quantity:{type:Number, require:true}
        },
        {
            menu:{type:String, require:true},
            price:{type:Number, require:true},
            quantity:{type:Number, require:true}
        },
        {
            menu:{type:String, require:true},
            price:{type:Number, require:true},
            quantity:{type:Number, require:true}
        }
    ],
    
    amount:{
            type:Number, 
            require:true
    }
})

module.exports = mongoose.model("MenuItems",MenuSchema)//MenuItems - collection name