const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post")

const bcrypt = require("bcrypt");
const {json} = require("express");


// CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }

});


// UPDATE POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.params.id) {


            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    {new: true}
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You may only update your own post.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
    });


// DELETE POST
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

// GET POST


    module.exports = router;