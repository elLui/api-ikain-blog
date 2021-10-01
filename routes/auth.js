const router = require("express").Router();


// pw hashing encryption - start

const bcrypt = require("bcrypt");

// pw hashing encryption - end

// bring in our User table model
const User = require("../models/User")


// creating :: post
// updating :: put
// deleting :: delete
// fetching :: get


// REGISTER
router.post("/register", async (req, res) => {
    try {

        // password hash
        const salt = await bcrypt.genSalt(12);
        const hashedPass = await bcrypt.hash(req.body.password, salt);




        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save();
        res.status(200).json(user);

    } catch(err) {
        res.status(500).json(err);
    }
})


// LOGIN
router.post("/login", async (req, res) => {
    try {
        // first check to see if the user is located in the User table
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("Wrong User Name - Please register or check name.")

        // then ensure passwords match
        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong Password - Please try again.")

        // removing hashed password from response
        // needed to insert only the needed parsed data from return // _doc holds our form data
        const {password, ...others} = user._doc;

        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;