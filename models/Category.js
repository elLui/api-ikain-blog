const mongoose = require("mongoose");

// this schema creates an object that will be used to sort our post according to category
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps:true});

module.exports = mongoose.model("Category", CategorySchema);