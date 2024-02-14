const Restaurant = require("../Models/Restschema");

exports.Rest = (req, res) => {
    Restaurant.find().then((result) => {
        res.status(200).json({
            message: "Restaurant Fetched successfully",
            Data: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Error in Database",
            error: error
        });
    })
}

exports.findbymealtype_id = async (req, res) => {
    try {
        const { mealtype_id } = req.params
        const dataforMealId = await Restaurant.find({ mealtype_id: mealtype_id })
        res.status(200).send(dataforMealId)
    } catch {
        res.status(400).send("internal error")
    }
}

exports.findbylocation_id = async (req, res) => {
    try {
        // const array=[];
        const { location_id } = req.params
        const dataforId = await Restaurant.find({ location_id: location_id })
        // array.push(dataforid)
        res.status(200).send(dataforId)
    } catch {
        res.status(400).send("internal error")
    }
}

exports.findbycity = async (req, res) => {
    try {
        const { city } = req.params
        const restid = await Restaurant.findOne({ city: city })
        res.status(200).send(restid)
    } catch {
        res.status(400).send("internal error")
    }
}

exports.findbyid = async (req, res) => {
    try {
        const result = await Restaurant.findById(req.params._id);
        res.status(200).send(result)
    }
    catch {
        res.status(400).send("internal error")
    }
}

exports.getRestaurantDataByQuery = async (req, res) => {
    try {
        const { mealtype_id, city, cuisine, min_price, sort, location_id } = req.query;
        const query = {};
        if (city) query.city = city;
        if (mealtype_id) query.mealtype_id = Number(mealtype_id)
        if (location_id) query.location_id = Number(location_id)
        if (cuisine) {
            query.cuisine = { $elemMatch: { name: cuisine } };
        }
        if (min_price) {
            query.min_price = { $gte: Number(min_price) };
        }

        const sortOptions = {};
        if (sort) {
            sortOptions[sort] = 1;
        }

        const restaurants = await restSchema.find(query).sort(sortOptions).exec();

        res.json(restaurants);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

exports.filter = async (req, res) => {
    try {
        const { location_id, mealtype_id, cuisine_id, sort, lcost, hcost } = req.body
        const query = {}

        if (location_id) query.location_id = location_id
        if (mealtype_id) query.mealtype_id = mealtype_id
        if (cuisine_id && cuisine_id.length > 0) {
            query.cuisine = { $elemMatch: { id: { $in: cuisine_id } } };
        }

        if (lcost !== undefined && hcost !== undefined) {
            query.min_price = { $lte: hcost, $gte: lcost }
        }

        const sortOptions = {};
        if (sort) {
            sortOptions.min_price = sort
        }
        
        const restaurantName = await Restaurant.find(query).sort(sortOptions).exec()

        if (restaurantName.length == 0) {
            res.json({ msg: "no city found" })
        } else {
            res.json(restaurantName)
        }
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}



// exports.api=async(req,res)=>{
//     try{
//         const page=parseInt(req.query.page)-1 ||0;
//         const limit=parseInt(req.query.limit) ||0;
//         const search=req.query.search ||"";
//         let sort=req.query.sort || "aggregate_rating"&"min_price";
//         let restaurants=req.query.restaurants || "All";

//         const Restoptions=[
//             "meal type" ,
//             "locality" ,
//             "cuisine.name",
//             "city",
//             "low cost",
//             "high cost",
//             "sort",
//             "page no",
//             "name"
//         ];
//         restaurants==="All"
//         ?(restaurants=[...Restoptions]):(restaurants=req.query.restaurants.split(","))
//         req.query.sort
//         ?(sort=req.query.sort.split(',')):(sort=[sort]);

//         let sortby={};
//         if(sort[1]){
//             sortby[sort[0]]=sort[1]
//         }else{
//             sortby[sort[0]]="asc;"
//         }

//         const frest=await Restaurant.find(
//             {
//                 $or:[
//                     {
//                         name:{
//                             $regex:search,$options:"i"
//                         }
//                     },
//                     {
//                         locality:{
//                             $regex:search,
//                             $options:"i"
//                         }
//                     },
//                     {
//                         "cuisine.name":{
//                             $regex:search,
//                             $options:"i"
//                         }
//                     },
//                     {
//                         city:{
//                             $regex:search,
//                             $options:"i"
//                         }
//                     }
//                 ]
//             })
// .where("Restaurant")
// .in([...Restoptions])
// .sort(sortby)
// .skip(page*limit)
// .limit(limit);

//     const total=await Restaurant.countDocuments({
//         restaurants:{$in:[Restoptions]},
//         name:{$regex:search,$options:"i"},
//         "cuisine.name":{$regex:search,$options:"i"},
//         city:{$regex:search,$options:"i"}
//     });

//     const response={
//         error:false,
//         total,
//         page:page+1,
//         limit,
//         restaurants:Restoptions,
//         frest,
//     };
//     res.status(200).json(response);
// }catch(err){
//     console.log(err);
//     res.status(500).json({
//         error:true,
//         message:"Internal server error!"
//     });
// }
// };


