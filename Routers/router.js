var express = require("express");
var router = express.Router();
// var posted=require("../Controllers/userController");

const User1 = require("../Controllers/Rest");
const User2 = require("../Controllers/Meal");
const User3 = require("../Controllers/Loc");
const User4 = require("../Controllers/userController");
const User5 = require("../Controllers/item");


router.get("/getRestaurantData", User1.Rest);
router.get("/getMealType", User2.Meal);
router.get("/getLocation", User3.Loctn);

router.get("/getRestaurantByCity/:city", User1.findbycity)
router.get("/getRestaurantById/:_id", User1.findbyid)
router.get("/getRestaurantBylocation_id/:location_id", User1.findbylocation_id)

router.get("/getRestaurantBymealtype_id/:mealtype_id", User1.findbymealtype_id)
router.get("/getRestaurantDataByQuery", User1.getRestaurantDataByQuery)
router.post("/filter", User1.filter)

router.get("/getMenuItemByName/:name", User5.getMenuItemByName)

// router.get("/api/search",User1.api);

router.post("/register", User4.register);

router.post("/login", User4.login);

module.exports = router;