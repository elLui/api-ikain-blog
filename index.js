// create express server named app
const express = require("express");
const app = express();


// mongoDB connection -- start

// used to hide user data from git repo
const dotenv = require("dotenv");
dotenv.config();

// enable json for parsing in postman :P
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.IRIS_KAIN_DB_URL)
    .then(console.log("connected to mongoDB cloud server"))
    .catch((err) => {
        console.log(err)
    });

// mongoDB connection -- end

// current route list -- start

const authRoute = require("./routes/auth")

// current route list -- end








app.use("/api/auth", authRoute);


















// app listen feedback path - start
app.listen("5000", () => {
    console.log("express backend up and running - for real this time - i mean it")
})
// app listen feedback path - end
