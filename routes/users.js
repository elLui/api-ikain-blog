const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")

const bcrypt = require("bcrypt");


// UPDATE
router.put("/:id", async (req, res) => {
    // before allowing update compare current user _id to User record before updating
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(12);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                },
                {new: true}
            );

            // remove hashed password from response
            const {password, ...others} = updatedUser._doc;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You should know === You may only update your account;");
    }
});


// GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


// DELETE
router.delete("/:id", async (req, res) => {
    // before allowing update compare current user _id to User record before updating
    if (req.body.userId === req.params.id) {
        try {

            // find all post by user
            const user = await User.findById(req.params.id);

            try {

                // delete all post by user
                await Post.deleteMany({username: user.username});

                // delete User
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted.");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found.")
        }


    } else {
        res.status(401).json("You may only delete your account.");
    }
});


module.exports = router;