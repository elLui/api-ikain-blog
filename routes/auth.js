const router = require("express").Router();


// bring in our User table model
const User = require("../models/User")


// creating :: post
// updating :: put
// deleting :: delete
// fetching :: get


// REGISTER
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const user = await newUser.save();
        res.status(200).json(user);

    } catch(err) {
        res.status(500).json(err);
    }
})



module.exports = router;