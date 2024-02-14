const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rout = require("./Routers/router");

const app = express();
const PORT = 1900;

// Middleware
app.use(cors({
    origin: "https://zomato-frontend-bay.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://ramya:Ramya1234@cluster0.ssbc8ox.mongodb.net/your-database-name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
    console.error("MongoDB Connection Error:", error);
});
db.once("open", () => {
    console.log("Connected to MongoDB Successfully");
});

// Routes
app.use("/", rout);

// Server Start
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});
