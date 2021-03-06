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
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");
// current route list -- end

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);



// app image processing items - start
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded.");
});
// app image processing items - end



// app listen feedback path - start
app.listen("5000", () => {
    console.log("express backend up and running - for real this time - i mean it")
})
// app listen feedback path - end