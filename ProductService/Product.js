const mongoose = require("mongoose");

mongoose.model("Product", {

    name: {
        type: String,
        require: true
    },
    categoryId: {
        type: Number,
        require: true
    },
    categoryName: {
        type: String,
        require: true
    },
    averageRating: {
        type: Number,
        require: true
    },
    numberOfRaters: {
        type: Number,
        require: true
    }


});