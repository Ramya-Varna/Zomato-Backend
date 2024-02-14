// const userModel = require("../Modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = " SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const userModel=require("../Models/user");

// const signup = async (req,res)=>{
//Existing User Check
//Hashed Password
//User Creation
//Token Generate

exports.register = async(req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //Hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        //User Creation
        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        //Token Generate
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });

    }
};

// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const { email, password } = req.body;
//         const existingUser = await userModel.findOne({ email: email });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id }, SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token: token });
    } catch {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
