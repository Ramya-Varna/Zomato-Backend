const Location=require("../Models/Locschema");

exports.Loctn=(req,res)=>{
Location.find().then((result)=>{
        res.status(200).json({
            message:"Location Fetched successfully",
            Data: result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Error in Database",
            error:error
        });
})


}


