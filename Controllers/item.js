var items = require("../Models/Menuitemschema");

exports.getMenuItem=async(req,res) =>{
    
    try{
        const result = await items.find()
        res.status(200).send(result)
    }
    catch{
         res.status(400).send((err)=>err)
    }
}

 exports.getMenuItemByName = async(req,res) => {
    try{
        const {name}=req.params
        const resId = await items.findOne({name:name})
        res.status(200).json(resId)
    } catch{
        res.status(400).send("internal error")
    }
 }  
// exports.getMenuItem =(req,res) => {
//     const resId = req.params.resId;

//     item.find({restaurantId : resId})
//         .then(response => {
//             res.status(200) .json(
//                 {
//                     message: "Menuitems fetched successfully",
//                     menuItems: response 
//                 }
//             )

//         })
//         .catch(err=>{
//             res.status(500).json({error:err})
//         })

// }