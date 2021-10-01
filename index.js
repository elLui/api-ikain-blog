// create express server named app
const express = require("express");
const app = express();


// mongoDB connection -- start

// used to hide user data from git repo
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
mongoose.connect(process.env.IRIS_KAIN_DB_URL)
    .then(console.log("connected to mongoDB cloud server"))
    .catch((err) => {
        console.log(err)
    });

// mongoDB connection -- end



























// app listen feedback path - start
app.listen("5000", () => {
    console.log("express backend up and running - for real this time - i mean it")
})
// app listen feedback path - end
