const Mealtype=require("../Models/Mealschema");

exports.Meal=(req,res)=>{
    Mealtype.find().then((result)=>{
        res.status(200).json({
            message:"Mealtype Fetched successfully",
            Data: result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Error in Database",
            error:error
        });
})
}


   